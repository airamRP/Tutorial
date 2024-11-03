import { useState } from 'react';

const PRODUCTS = [
  { category: "Frutas", price: "$1", stocked: true, name: "Manzana" },
  { category: "Frutas", price: "$1", stocked: true, name: "Fruta del dragón" },
  { category: "Frutas", price: "$2", stocked: false, name: "Maracuyá" },
  { category: "Verduras", price: "$2", stocked: true, name: "Espinaca" },
  { category: "Verduras", price: "$4", stocked: false, name: "Calabaza" },
  { category: "Verduras", price: "$1", stocked: true, name: "Guisantes" }
];

/*
  (Salida)
  Input: Search
  Checkbox: Only show productos in stock
  (Tabla)
  Name         Price
    Fruits
  Apple         $1
  Dragonfruit   $2    
  ...
    Vegetables
  Spinach       $2
  ...

 (No stock: Style color red nombre fruta. Ej: Calabaza y Maracuyá)
*/

// 1. Separa la UI en una jerarquía de componentes
/*
  1. FilterableProductTable
      2. SearchBar
      3. ProductTable
          (Opcional: ProductTableHeader)
          4. ProductCategoryRow
          5. ProductRow
*/

// 2. Construye una versión estática en React
/*
  Renderiza la UI sin añadir interactividad ni estado
    Construye componentes, reutiliza componentes, pasa datos usando props
*/

function ProductCategoryRow({category}) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  )
}

function ProductRow({ product }) {
  return (
    <tr>
      <td style={{
         color: !product.stocked && 'red'
      }}>{product.name}</td>
      <td>{product.price}</td>
    </tr>

  )
}

function ProductTable({ products, filterText, inStockOnly }) {
  const vegetables = products.filter(p => 
    p.category === 'Verduras' && 
    p.name.toLowerCase().includes(filterText.toLowerCase()) &&
    (inStockOnly ? p.stocked : true)
  )
  const fruits = products.filter(p => 
    p.category === "Frutas" && 
    p.name.toLowerCase().includes(filterText.toLowerCase()) &&
    (inStockOnly ? p.stocked : true)
  )


  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <ProductCategoryRow category='Fruits' />
          {fruits.map(product =>
            <ProductRow key={product.name} product={product} />
          )}
          <ProductCategoryRow category='Verduras' />
          {vegetables.map(product =>
            <ProductRow key={product.name} product={product} />
          )}

        </tbody>
      </table>
    </>
  )
}

function ProductTable2({ products, filterText, inStockOnly }) {
  let prods = []
  let lastCategory = null

  products.forEach(p => {
    if(!p.name.toLowerCase().includes(filterText.toLowerCase())) {
      return
    }
    if(inStockOnly && !p.stocked) {
      return  
    }
    if(p.category !== lastCategory) {
      prods.push(
        <ProductCategoryRow key={p.category} category={p.category} />
      )
      lastCategory=p.category
    }
    prods.push(
      <ProductRow key={p.name} product={p} />
    )
  })

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {prods}
        </tbody>
      </table>
    </>
  )
}


function SearchBar({filterText, inStockOnly, onChangeText, onChangeStock}) {
  return (
    <form>
      <input type='text' placeholder='Search...'
        value={filterText}
        onChange={e => onChangeText(e.target.value)}
      />
      <br />
      <label>
        <input type='checkbox' 
          value={inStockOnly}
          onChange={e => onChangeStock(e.target.checked)}
        />
        Mostrar sólo productos en stock
      </label>
    </form>
  )
}

function FilterableProductTable() {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)

  return (
    <>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onChangeText={setFilterText}
        onChangeStock={setInStockOnly}
      />
      <ProductTable2 products={PRODUCTS} filterText={filterText} inStockOnly={inStockOnly} />
    </>
  )
}

export default function Index() {
  return (
    <FilterableProductTable />
  );
}