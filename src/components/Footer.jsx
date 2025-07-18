import React from 'react'

export default function Footer() {
  return (
    <footer className="center" style={{ minHeight: '60px', marginTop: '2rem', fontSize: '1.1rem', color: '#6d4c41' }}>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <span>© {new Date().getFullYear()} Anvi's Cafe. All rights reserved.</span>
      </div>
    </footer>
  )
}
