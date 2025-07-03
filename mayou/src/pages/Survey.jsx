// src/pages/Survey.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';     // vous avez déjà le container
import Button from '../components/Button';

export default function Survey() {
  const [rating, setRating]     = useState(5);
  const [hoverRating, setHover] = useState(0);
  const [comment, setComment]   = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    toast.success('Merci pour votre avis ⭐️');
    navigate('/');
  };

  return (
    <div className="survey container page-center">
      <h2 className="survey-title">
        Votre avis compte pour <span className="accent">MAYOU</span> !
      </h2>

      <form onSubmit={handleSubmit} className="survey-form">
        {/* ★ Note ★ */}
        <div className="form-group">
          <label className="form-label">Note</label>
          <div className="star-rating">
            {[1,2,3,4,5].map(star => {
              const filled = (hoverRating || rating) >= star;
              return (
                <span
                  key={star}
                  role="button"
                  aria-label={`${star} étoile${star>1?'s':''}`}
                  className={`star ${filled?'filled':''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </span>
              );
            })}
          </div>
        </div>

        {/* Commentaire */}
        <div className="form-group">
          <label className="form-label">Commentaire</label>
          <textarea
            className="form-input textarea"
            rows="4"
            placeholder="Dites-nous ce que vous avez aimé…"
            value={comment}
            onChange={e => setComment(e.target.value)}
            required
          />
        </div>

        {/* Actions */}
        <div className="survey-actions">
          <Button variant="ghost" type="button" onClick={() => navigate('/')}>
            Plus tard
          </Button>
          {/* ← celui-ci doit être un submit */}
          <Button type="submit">
            Envoyer
          </Button>
        </div>
      </form>
    </div>
  );
}
