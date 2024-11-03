import { useState } from 'react';

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};


export function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Foto de ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}

// Renderizado condicional

function AdminPanel () {
  return <h3>AdminPanel</h3>
}
function LoginForm () {
  return <h3>LoginForm</h3>
}

function Conditional (isLoggedIn) {
  let content;
  if (isLoggedIn) {
    content = <AdminPanel />;
  } else {
    content = <LoginForm />;
  }
  return (
    <div>
      {content}
    </div>
  );
}

function Conditional2 (isLoggedIn) {
  return (
    <div>
      {isLoggedIn && <AdminPanel />}
    </div>
  )
}

// Renderizado de listas
const products = [
  { title: 'Col', isFruit: false, id: 1 },
  { title: 'Ajo', isFruit: false, id: 2 },
  { title: 'Manzana', isFruit: true, id: 3 },
];

function Products() {
  const listItems = products.map(product =>
    <li 
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );
  
  return (
    <ul>{listItems}</ul>
  );
}

// Responder a eventos
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Hiciste clic {count} veces
    </button>
  );
}

// State compartido
function MyButtonCompartido({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Hiciste clic {count} veces
    </button>
  );
}

function UsarBototnesCompartidos() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }
  return (
    <div>
      <h1>Contadores que se actualizan juntos</h1>
      <MyButtonCompartido count={count} onClick={handleClick} />
      <MyButtonCompartido count={count} onClick={handleClick} />
    </div>
  )
}


export default function Index() {
  return (
    <div>
      <h1>Bienvenido a mi aplicación</h1>
      <MyButton />
      <MyButton />
      <UsarBototnesCompartidos />
    </div>
  );
}