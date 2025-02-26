import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Projects from './components/Projects'
import EmailCampaigns from './components/Projects/EmailCampaigns'
import SmsStrategies from './components/Projects/SmsStrategies'
import BlogArticles from './components/Projects/BlogArticles'
import EcomCopy from './components/Projects/EcomCopy'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <>
      {/* Add ScrollToTop component here */}
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='projects' element={<Projects />} />
          <Route path='projects/email' element={<EmailCampaigns />} />
          <Route path='projects/sms' element={<SmsStrategies />} />
          <Route path='projects/blog' element={<BlogArticles />} />
          <Route path='projects/ecom' element={<EcomCopy />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
