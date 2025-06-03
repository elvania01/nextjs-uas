'use client'

import { useEffect, useState } from 'react'

type Customer = {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  createdAt: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/user_customer')
      const data = await res.json()
      setUsers(data)
      setLoading(false)
    }

    fetchUsers()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Daftar Pelanggan</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Nama</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Telepon</th>
              <th className="p-2 border">Alamat</th>
              <th className="p-2 border">Dibuat</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.phone || '-'}</td>
                <td className="p-2 border">{user.address || '-'}</td>
                <td className="p-2 border">{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
