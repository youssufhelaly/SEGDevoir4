
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Stepper from '../components/Stepper';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

export default function Checkout() {
  const steps = ['Panier', 'Infos', 'Paiement', 'Confirmation'];
  const [current, setCurrent] = useState(0);
  const { cart, clearCart, total } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    cardNumber: '',
    expiration: '',
    cvv: ''
  });

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const minExpiration = `${yyyy}-${mm}`;

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const next = () => setCurrent(c => Math.min(c + 1, steps.length - 1));
  const prev = () => setCurrent(c => Math.max(c - 1, 0));

  const handleSubmit = e => {
    e.preventDefault();
    if (current < steps.length - 1) {
      next();
    } else {
      clearCart();
      toast.success('Paiement réussi 🎉');
      navigate('/survey');
    }
  };

  return (
    <div className="container page-center">
      <div style={{ borderBottom: '2px solid var(--color-accent)', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <Stepper steps={steps} current={current} />
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        {/* Étape 0 : Récapitulatif */}
        {current === 0 && (
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Récapitulatif</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '300px', overflowY: 'auto' }}>
              {cart.map(item => (
                <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
            <p style={{ textAlign: 'right', fontWeight: 600, marginTop: '1rem' }}>Total : ${total}</p>
          </div>
        )}

        {/* Étape 1 : Infos perso */}
        {current === 1 && (
          <div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Nom complet</label>
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '0.75rem', marginTop: '0.5rem' }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '0.75rem', marginTop: '0.5rem' }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Adresse</label>
              <input
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                required
                style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '0.75rem', marginTop: '0.5rem' }}
              />
            </div>
          </div>
        )}

        {/* Étape 2 : Paiement */}
        {current === 2 && (
          <div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Numéro de carte</label>
              <input
                name="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '0.75rem', marginTop: '0.5rem' }}
              />
            </div>
            <div className="form-group" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                <label>Expiration</label>
                <input
                  name="expiration"
                  type="month"
                  min={minExpiration}
                  value={formData.expiration}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '0.75rem', marginTop: '0.5rem' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label>CVV</label>
                <input
                  name="cvv"
                  type="password"
                  maxLength={3}
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '0.75rem', marginTop: '0.5rem' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Étape 3 : Confirmation */}
        {current === 3 && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <h3 style={{ marginBottom: '1rem' }}>Merci pour votre commande ! 🎉</h3>
            <p>Un email de confirmation vous sera envoyé sous peu.</p>
          </div>
        )}

        {/* Boutons de navigation : toujours deux, aux coins */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          {current === 0 ? (
            <Button variant="ghost" type="button" onClick={() => navigate('/cart')}>
              Annuler
            </Button>
          ) : (
            <Button variant="ghost" type="button" onClick={prev}>
              Précédent
            </Button>
          )}

          <Button type="submit">
            {current < steps.length - 1 ? 'Suivant' : 'Payer'}
          </Button>
        </div>
      </form>
    </div>
  );
}