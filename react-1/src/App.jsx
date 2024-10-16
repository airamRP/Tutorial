import { useState } from 'react'
import './App.css'

function MyButton({count, onClick}) {
  
  return (
    <button onClick={onClick}>Hiciste clic {count} veces</button>
  )
}

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

function Profile() {
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
  )
};

let isLoggedIn = true

function Conditional() {
  let content;
  isLoggedIn = false
  if (isLoggedIn) {
    content = <Profile />;
  } else {
    content = <MyButton />;
  }
  return (
    <div>
      {content}
    </div>
  );
}

function ConditionalCompact() {
  isLoggedIn = false
  return (
    <div>
      {isLoggedIn ? (
        <Profile />
      ) : (
        <MyButton />
      )}
    </div>
  )
}

function LogicConditional() {
  isLoggedIn = false
  {
    return isLoggedIn && <Profile />
  }
}

const products = [
  { title: 'Col', isFruit: false, id: 1 },
  { title: 'Ajo', isFruit: false, id: 2 },
  { title: 'Manzana', isFruit: true, id: 3 },
];

function ShoppingList() {
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

function App() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <>
      <h1>Bienvenido a mi aplicación</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <MyButton count={count} onClick={handleClick}/>
        {/* <Profile />
        <MyButton /> */}
      </div>
      <Conditional />
      <ConditionalCompact />
      <LogicConditional />
      {isLoggedIn && <Profile />}
      <ShoppingList />
    </>
  )
}

export default App
