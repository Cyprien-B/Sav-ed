# SAV-ed

Ce projet est parti d'un besoin que j'ai constaté quand j'étais opticien ou j'ai passé énormément de temps à recevoir et à renvoyer des pièces de lunettes.  
Lorsqu’un SAV est nécessaire sur un produit qui a été envoyé par transporteur, il est coûteux de le faire revenir chez son vendeur. Tant au niveau des frais d’envoi et de traitement qu'au niveau de l'écologie car souvent ces produits sont jetés une fois reçu et un simple contrôle visuel est effectué.  
Le problème est aussi présent pour les particuliers qui commandent sur internet. Contacter le service client est souvent fastidieux et source de frustration pour les clients.  
Notre solution vise à rendre le SAV fluide, simple à gérer autant pour le client que pour le vendeur et à permettre au vendeur de fournir un service après-vente de meilleure qualité.  

La solution que nous avons trouvée est un QR Code qui redirige les clients vers un formulaire sur notre application, dans lequel ils vont pouvoir décrire leurs problèmes avec le produit et prendre en photo celui-ci .  
Le vendeur recevra alors message l'invitant à se connecter sur notre application. Il aura accès à une liste de tickets contenant la photo et le contenu du formulaire.   Ainsi le vendeur fera revenir la marchandise uniquement quand c'est nécessaire. Le client sera informé automatiquement par mail et SMS de l'évolution de sa demande de SAV.  

Le client aura, en cinq minutes, fait sa demande de SAV sans avoir à contacter personne avec un simple téléphone.  

## Fonctionnalités disponibles dans notre application 


Pour le visiteur:  
-S’inscrire sur le site  
-Remplir un formulaire de SAV.  
-Ajouter une photo au formulaire depuis son téléphone portable.   

Les clients/utilisateurs SAV sont les personnes inscrites sur le site et pour qui il a été créé un QR Code. Ce sont donc des professionnels qui veulent suivre leurs demandes de SAV et modifier leur statut.  
Pour les Clients:   
-Générer son QRcode unique pour le communiquer à ses client  
-Afficher la liste de leurs tickets SAV reçu  
-Rechercher un ticket particulier grâce à une barre de recherche  
-Modifier l'état/le statut d’avancement d’un ticket SAV. 	  
(Exemple : reçu -> en cours de traitement -> validé/retour de pièce nécessaire)  
-Si le statut d’un SAV est modifié, un email et SMS est envoyé automatiquement au client pour le tenir informé.  
-Afficher le détail d'un ticket SAV Avec la photo et le message   
-Modifier son profil sur le site  


Pour l’administrateur du site:  
-Lister les vendeurs, modifier leur profil, modifier les tickets et les supprimer   

# Linter / Convention

### Fonctions

Norme ES6 fonctions fléchées

### Composant

Les composants sont déclarer en fonctions classiques

### PropTypes

Les proptypes doivent être déclarer dans chaques composants en cas de props passé en composant

### Nommage des fichiers

Les fichiers relatifs au SAV côté user commencent par : "SAV"
Le formulaire côté visiteur est nommé FormSAV pour éviter la confusion

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

