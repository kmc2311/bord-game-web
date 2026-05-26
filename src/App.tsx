import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { ProductDetail } from './pages/ProductDetail'
import { Blog } from './pages/Blog'
import { BlogDetail } from './pages/BlogDetail'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
