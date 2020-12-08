import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import ListaIngredientesEmProgresso from './ListaIngredientesEmProgresso';
import fetchFood from '../servicesAPI/foodAPI';
import ReceitasContext from '../context/ReceitasContext';
import shareIcon from '../images/shareIcon.svg';
import heartIcon from '../images/whiteHeartIcon.svg';

function ComidaEmProgresso({ match }) {
  const { setIsFetching, isFetching } = useContext(ReceitasContext);
  const [meal, setMeal] = useState([]);
  const { id } = match.params;

  useEffect(() => {
    setIsFetching(true);
    const firstRequestAPI = async () => {
      const response = await fetchFood('byId', id);
      setMeal(...response);
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isFetching
        ? <h2>Loading...</h2>
        : (
          <main className="detalhes-main">
            <header className="detalhes-header">
              <section className="detalhes-img">
                <section className="detalhes-img-border">
                  <img data-testid="recipe-photo" src={ meal.strMealThumb } alt="" />
                </section>
              </section>
              <section className="detalhes-bar">
                <section className="detalhes-titles">
                  <h3 data-testid="recipe-title" className="detalhes-title">
                    { meal.strMeal }
                  </h3>
                  <h4 data-testid="recipe-category" className="detalhes-subtitle">
                    { meal.strCategory }
                  </h4>
                </section>
                <section className="detalhes-buttons">
                  <button
                    data-testid="share-btn"
                    type="button"
                    className="detalhes-share"
                  >
                    <img src={ shareIcon } alt="compartilhe" />
                  </button>
                  <button
                    data-testid="favorite-btn"
                    type="button"
                    className="detalhes-fav"
                  >
                    <img src={ heartIcon } alt="compartilhe" />
                  </button>
                </section>
              </section>
            </header>
            <article className="detalhes-article">
              <ListaIngredientesEmProgresso recipe={ meal } type="meal" />
              <section className="detalhes-instructions">
                <p data-testid="instructions">{meal.strInstructions}</p>
              </section>
            </article>
          </main>
        )}
    </div>
  );
}

ComidaEmProgresso.propTypes = {
  match: propTypes.shape({
    isExact: propTypes.bool,
    params: propTypes.shape({
      id: propTypes.string,
      path: propTypes.string,
      url: propTypes.string,
    }),
    path: propTypes.string,
    url: propTypes.string,
  }).isRequired,
};

export default ComidaEmProgresso;
