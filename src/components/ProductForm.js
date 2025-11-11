import React, { useState } from 'react';

export default function ProductForm({ initial = null, onSubmit }) {
  const [form, setForm] = useState(() => initial ? { ...initial } : {
    name: '',
    price: '',
    category: '',
    image: '',
    description: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.name || !form.price || !form.category) {
      alert('Nom, prix et catégorie sont requis.');
      return;
    }
    onSubmit({
      ...form,
      price: Number(form.price),
      id: initial?.id ?? Date.now()
    });
  };

  return (
<form onSubmit={submit} className="p-4 shadow rounded bg-light" style={{ maxWidth: '500px', margin: 'auto' }}>
  <div className="mb-3">
    <input
      type="text"
      name="name"
      placeholder="Nom"
      value={form.name}
      onChange={handleChange}
      className="form-control form-control-lg"
      required
    />
  </div>
  <div className="mb-3">
    <input
      type="number"
      name="price"
      placeholder="Prix (MAD)"
      value={form.price}
      onChange={handleChange}
      className="form-control form-control-lg"
      required
    />
  </div>
  <div className="mb-3">
    <input
      type="text"
      name="category"
      placeholder="Catégorie"
      value={form.category}
      onChange={handleChange}
      className="form-control form-control-lg"
      required
    />
  </div>
  <div className="mb-3">
    <input
      type="url"
      name="image"
      placeholder="URL image"
      value={form.image}
      onChange={handleChange}
      className="form-control form-control-lg"
    />
  </div>
  <div className="mb-3">
    <textarea
      name="description"
      placeholder="Description"
      value={form.description}
      onChange={handleChange}
      className="form-control form-control-lg"
      rows="4"
    />
  </div>
  <div className="d-grid">
    <button
      type="submit"
      className="btn btn-primary btn-lg"
      style={{
        background: 'linear-gradient(90deg, #6f42c1, #6610f2)',
        border: 'none',
        fontWeight: '500',
      }}
    >
      {initial ? 'Mettre à jour' : 'Ajouter'}
    </button>
  </div>
</form>

  );
}
