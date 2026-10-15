'use client';
import Link from 'next/link';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { getToken } from '../lib';

type Order = {
  id: string; createdAt: string; status: string; totals: { total_usd: number };
  brief: Record<string, string>; contact: Record<string, string>;
  items: { id: string; name: string; qty: number; total_usd: number }[];
  payment: { mode: string; status: string }; uploads: { name: string; stored: string; size: number }[]; adminNotes: string;
};
type Msg = { id: string; createdAt: string; name: string; email: string; company?: string; message: string };

async function api(path: string, init?: RequestInit) {
  const r = await fetch(path, { ...init, headers: { Authorization: `Bearer ${getToken() ?? ''}`, 'Content-Type': 'application/json' } });
  if (!r.ok) throw Object.assign(new Error((await r.json().catch(() => ({}))).error || r.statusText), { status: r.status });
  return r;
}

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [tab, setTab] = useState<'orders' | 'enquiries'>('orders');

  const load = useCallback(async () => {
    if (!getToken()) { setErr('Sign in on the Studio page first.'); return; }
    try {
      const o = await (await api('/api/admin/orders')).json(); setOrders(o.orders); setStatuses(o.statuses);
      const m = await (await api('/api/admin/contacts')).json(); setMsgs(m.messages);
      setErr(null);
    } catch (e) { setErr((e as Error).message); }
  }, []);
  useEffect(() => { load(); }, [load]);

  async function patch(id: string, body: Record<string, string>) {
    const r = await (await api(`/api/admin/orders/${id}`, { method: 'PATCH', body: JSON.stringify(body) })).json();
    setOrders((p) => p.map((o) => (o.id === id ? r.order : o)));
  }
  async function download(o: Order, stored: string, name: string) {
    const r = await api(`/api/admin/files/${o.id}/${encodeURIComponent(stored)}`);
    const url = URL.createObjectURL(await r.blob());
    const a = document.createElement('a'); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <main className="admin-shell" style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px' }}>
      <p className="admin-eyebrow"><Link href="/admin">← Studio</Link></p>
      <h1 className="admin-login__title">Orders &amp; enquiries</h1>
      <div style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
        <button className={`admin-btn${tab === 'orders' ? ' admin-btn--primary' : ''}`} onClick={() => setTab('orders')}>Orders ({orders.length})</button>
        <button className={`admin-btn${tab === 'enquiries' ? ' admin-btn--primary' : ''}`} onClick={() => setTab('enquiries')}>Enquiries ({msgs.length})</button>
        <button className="admin-btn" onClick={load}>Refresh</button>
      </div>
      {err && <p className="admin-error" role="alert">{err}</p>}
      {tab === 'orders' && (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead><tr style={{ textAlign: 'left' }}><th>Order</th><th>Date</th><th>Brand / client</th><th>Total</th><th>Payment</th><th>Status</th></tr></thead>
          <tbody>
            {orders.map((o) => (
              <Fragment key={o.id}>
                <tr style={{ borderTop: '1px solid #0001', cursor: 'pointer' }} onClick={() => setOpen(open === o.id ? null : o.id)}>
                  <td style={{ padding: '10px 0' }}><strong>{o.id}</strong></td>
                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                  <td>{o.brief.brandName}<br /><small>{o.contact.name} · {o.contact.email}</small></td>
                  <td>${o.totals.total_usd.toLocaleString()}</td>
                  <td>{o.payment.mode} · {o.payment.status}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <select value={o.status} onChange={(e) => patch(o.id, { status: e.target.value })} className="admin-input" style={{ padding: 4 }}>
                      {statuses.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
                {open === o.id && (
                  <tr key={`${o.id}-d`}><td colSpan={6} style={{ padding: '8px 0 20px' }}>
                    <p><strong>Items:</strong> {o.items.map((l) => `${l.name} ×${l.qty} ($${l.total_usd})`).join(', ')}</p>
                    <p><strong>Contact:</strong> {Object.entries(o.contact).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join(' · ')}</p>
                    <p><strong>Brief:</strong> {Object.entries(o.brief).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join(' · ')}</p>
                    {o.uploads.length > 0 && <p><strong>Files:</strong> {o.uploads.map((u) => <button key={u.stored} className="admin-btn" style={{ marginRight: 6 }} onClick={() => download(o, u.stored, u.name)}>{u.name}</button>)}</p>}
                    <textarea className="admin-input" rows={3} defaultValue={o.adminNotes} placeholder="Internal notes" onBlur={(e) => e.target.value !== o.adminNotes && patch(o.id, { adminNotes: e.target.value })} style={{ width: '100%' }} />
                  </td></tr>
                )}
              </Fragment>
            ))}
            {!orders.length && !err && <tr><td colSpan={6} style={{ padding: 20 }}>No orders yet.</td></tr>}
          </tbody>
        </table>
      )}
      {tab === 'enquiries' && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {msgs.map((m) => (
            <li key={m.id} style={{ borderTop: '1px solid #0001', padding: '14px 0' }}>
              <strong>{m.name}</strong> · <a href={`mailto:${m.email}`}>{m.email}</a>{m.company ? ` · ${m.company}` : ''} <small>{new Date(m.createdAt).toLocaleString()}</small>
              <p style={{ whiteSpace: 'pre-wrap', marginTop: 6 }}>{m.message}</p>
            </li>
          ))}
          {!msgs.length && !err && <li>No enquiries yet.</li>}
        </ul>
      )}
    </main>
  );
}
