import styles from './App.module.css'
import IconList from './component/IconList';
import SeedList from './component/SeedList';
import TodoList from './component/TodoList';

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.Header}>
        <div className={styles.Logo}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48.011" height="48.817" version="1.0"><path strokeWidth=".642" d="M12.045 48.817c-3.599-.256-5.48-1.553-6.446-2.993.185-3.505.722-7.87 2.23-11.832.864-2.268 2.091-4.322 3.596-5.832 1.646-1.8 3.167-3.184 4.699-4.325 3.024-2.24 5.677-3.216 6.517-3.56.849-.327 2.372-.943 4.214-1.629 1.837-.629 4.062-1.539 5.96-2.652 3.894-2.129 7.121-4.531 7.116-4.532.006.001-3.444 1.913-7.453 3.5-2.022.863-4.089 1.43-6.018 1.876-1.898.488-3.502.986-4.384 1.327-1.651.69-11.542 3.854-16.594 14.464-1.143 2.71-1.86 5.513-2.324 8.14-1.142-.645-2.564-1.892-2.951-4.201-.675-4.023-.3-16.094 10.64-22.8 10.939-6.704 23.152-5.364 28.997-7.33C45.688 4.47 48.01 0 48.01 0s-4.87 45.509-35.966 48.817z" /></svg>
        </div>
        <h1><span>Jardinage</span> organiseur</h1>
        {/* Gardenizer */}
      </div>
      <SeedList />

      <TodoList />
      {/* // TODO */}
      <h1>Avant les boutures</h1>
      <ul>
        <li>Faire du pralin</li>
      </ul>
      <h1>Boutures</h1>
      <ul>
        <li>Bouturage arbre</li>
        <li>Drageon de chataigner en foret Septembre</li>
        <li>Cerise, prunes, poires, figues, </li>
        <li>Troc de plante, Facebook</li>
      </ul>
      <ul>
        <li>TODO: add priority on tasks</li>
        <li>Sort by date and month and season</li>
        <h4>Chaque semis peut avoir d'associé des mois </h4>
        <ul>
          <li>liste des semis</li>
          <li>association de mois</li>
          <li>description</li>
          <li>? lien auto rustica ?</li>
          {/* Lien outil de recherche */}
          {/* https://www.rustica.fr/recherche.html?recherche=cerise+griotte */}
        </ul>
        <div>mois par mois avec des cases de semis (ex radis de mars à octobre) </div>
      </ul>
      <IconList />
    </div>
  );
}

export default App;
