import { createStore, combineReducers, compose  } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

/** Custom Reducers */
import buscarUsuarioReducer from './reducers/buscarUsuarioReducer';

// Configurar firestore.
const firebaseConfig = {
    apiKey: "AIzaSyC47wKvJe9XtwTwc1C4Hh6YShmRx5oni-U",
    authDomain: "store-6ba8a.firebaseapp.com",
    databaseURL: "https://store-6ba8a.firebaseio.com",
    projectId: "store-6ba8a",
    storageBucket: "store-6ba8a.appspot.com",
    messagingSenderId: "786740904645",
    appId: "1:786740904645:web:6960bbe6e8e004b9"
}

// inicializar firebase
firebase.initializeApp(firebaseConfig);

// configuracion de react-redux
const rrfConfig = {
    userProfile : 'users',
    useFirestoreForProfile: true
}

// crear el enhacer con compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// Reducers 
const rootReducer = combineReducers({
    firebase : firebaseReducer,
    firestore: firestoreReducer, 
    usuario : buscarUsuarioReducer
})

// state inicial
const initialState = {};

// Create el store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
));
export default store;