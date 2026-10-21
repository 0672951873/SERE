import { useState, type FormEvent } from 'react'
import { ArrowDownRight, ArrowRight, Menu, Minus, Plus, ShoppingBag, X } from 'lucide-react'

type Product = {
  id: number
  name: string
  notes: string
  family: 'Eau de parfum' | 'Extrait de parfum'
  price: number
  image: string
  label?: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'After the Rain',
    notes: 'Bergamot · wet stone · vetiver',
    family: 'Eau de parfum',
    price: 185,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85',
    label: 'Bestseller',
  },
  {
    id: 2,
    name: 'Velvet Hour',
    notes: 'Black tea · iris · soft leather',
    family: 'Extrait de parfum',
    price: 240,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85',
    label: 'New',
  },
  {
    id: 3,
    name: 'Salt on Skin',
    notes: 'Sea salt · neroli · driftwood',
    family: 'Eau de parfum',
    price: 185,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 4,
    name: 'The Last Light',
    notes: 'Fig leaf · amber · sandalwood',
    family: 'Extrait de parfum',
    price: 240,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=85',
  },
]

const filters = ['All fragrances', 'Eau de parfum', 'Extrait de parfum'] as const

type Filter = (typeof filters)[number]

function App() {
  const [filter, setFilter] = useState<Filter>('All fragrances')
  const [bag, setBag] = useState<Product[]>([])
  const [bagOpen, setBagOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const visibleProducts = filter === 'All fragrances'
    ? products
    : products.filter((product) => product.family === filter)

  const bagCount = bag.length
  const bagTotal = bag.reduce((total, product) => total + product.price, 0)

  function addToBag(product: Product) {
    setBag((currentBag) => [...currentBag, product])
  }

  function removeFromBag(productId: number) {
    setBag((currentBag) => {
      const productIndex = currentBag.findIndex((product) => product.id === productId)
      return productIndex === -1
        ? currentBag
        : currentBag.filter((_, index) => index !== productIndex)
    })
  }

  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <>
      <div className="announcement">Complimentary delivery on all orders over $250</div>
      <header className="site-header">
        <button
          className="icon-button menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <a href="#collection" onClick={() => setMenuOpen(false)}>Fragrances</a>
          <a href="#house" onClick={() => setMenuOpen(false)}>Our house</a>
          <a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a>
        </nav>
        <a className="wordmark" href="#top" aria-label="Serein Parfums home">
          <span>SEREIN</span>
          <small>PARFUMS · SOUTH AFRICA</small>
        </a>
        <div className="header-actions">
          <a className="account-link" href="#newsletter">Account</a>
          <button className="bag-button" type="button" onClick={() => setBagOpen(true)} aria-label={`Open bag, ${bagCount} items`}>
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span>Bag ({bagCount})</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-label="Serein fragrance collection">
          <div className="hero-image" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="eyebrow">Scent, remembered</p>
            <h1>The art<br />of staying.</h1>
            <p className="hero-description">Fragrance for the moments<br />that follow you home.</p>
            <a className="gold-link" href="#collection">Discover the collection <ArrowRight size={16} /></a>
          </div>
          <div className="hero-index"><span>01</span><i />04</div>
          <a className="scroll-cue" href="#collection" aria-label="Scroll to the collection"><ArrowDownRight size={18} /></a>
          <span className="hero-caption">SOUTH AFRICA · COMPOSED IN THE QUIET HOURS</span>
        </section>

        <section className="intro-band" id="house">
          <p className="eyebrow">A study in presence</p>
          <h2>Not a room you enter.<br /><em>A feeling that remains.</em></h2>
          <p className="intro-note">Composed slowly. Worn close.<br />Made to become part of you.</p>
        </section>

        <section className="collection-section" id="collection">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The Serein collection</p>
              <h2>Find your <em>after.</em></h2>
            </div>
            <a className="text-link" href="#journal">The making of Serein <ArrowRight size={15} /></a>
          </div>
          <div className="filter-row" role="group" aria-label="Filter fragrances">
            {filters.map((item) => (
              <button
                className={`filter-button${filter === item ? ' is-active' : ''}`}
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
            <span className="product-count">0{visibleProducts.length} fragrances</span>
          </div>
          <div className="product-grid">
            {visibleProducts.map((product, index) => (
              <article className="product-card" key={product.id} style={{ animationDelay: `${index * 90}ms` }}>
                <div className="product-image-wrap">
                  <img src={product.image} alt={`${product.name} fragrance`} loading="lazy" />
                  {product.label && <span className="product-label">{product.label}</span>}
                  <button className="quick-add" type="button" onClick={() => addToBag(product)} aria-label={`Add ${product.name} to bag`}>
                    <Plus size={17} /> <span>Add to bag</span>
                  </button>
                </div>
                <div className="product-details">
                  <div>
                    <p className="product-family">{product.family}</p>
                    <h3>{product.name}</h3>
                    <p className="product-notes">{product.notes}</p>
                  </div>
                  <span className="product-price">${product.price}</span>
                </div>
              </article>
            ))}
          </div>
          <a className="collection-link" href="#journal">Explore all fragrances <ArrowRight size={16} /></a>
        </section>

        <section className="story-section" id="journal">
          <div className="story-image" role="img" aria-label="Perfume bottle in warm evening light" />
          <div className="story-copy">
            <p className="eyebrow">The journal · No. 04</p>
            <h2>Where a scent<br />begins <em>to linger.</em></h2>
            <p>Some things are best discovered slowly. A trace of incense in the hallway. The warmth left on a borrowed coat. Our fragrances begin with these small, unmistakable things.</p>
            <a className="gold-link" href="#newsletter">Read the journal <ArrowRight size={16} /></a>
          </div>
        </section>

        <section className="newsletter-section" id="newsletter">
          <p className="eyebrow">Letters from Serein</p>
          <h2>A little more <em>presence.</em></h2>
          <p>Notes on scent, place, and the things we keep.</p>
          <form className="newsletter-form" onSubmit={submitNewsletter}>
            <label className="sr-only" htmlFor="email-address">Email address</label>
            <input id="email-address" name="email" type="email" placeholder="Your email address" required disabled={subscribed} />
            <button type="submit" aria-label="Subscribe to letters" disabled={subscribed}>
              {subscribed ? 'Subscribed' : 'Join us'} <ArrowRight size={16} />
            </button>
          </form>
          {subscribed && <p className="form-success" role="status">You’re on the list. Look out for a note from us.</p>}
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-wordmark" href="#top">SEREIN <span>PARFUMS · SOUTH AFRICA</span></a>
        <p>Made with intention, in South Africa.</p>
        <div className="footer-links"><a href="#house">Contact</a><a href="#house">Shipping & returns</a><a href="#house">Instagram</a></div>
        <small>© 2026 Serein Parfums</small>
      </footer>

      {bagOpen && (
        <div className="drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setBagOpen(false)}>
          <aside className="bag-drawer" aria-label="Shopping bag" aria-modal="true" role="dialog">
            <div className="drawer-heading">
              <div><p className="eyebrow">Your selection</p><h2>The bag <span>({bagCount})</span></h2></div>
              <button className="icon-button" type="button" aria-label="Close bag" onClick={() => setBagOpen(false)}><X size={20} /></button>
            </div>
            {bag.length === 0 ? (
              <div className="empty-bag"><ShoppingBag size={24} strokeWidth={1.3} /><p>Your bag is waiting.</p><button className="text-link" type="button" onClick={() => setBagOpen(false)}>Discover fragrances <ArrowRight size={15} /></button></div>
            ) : (
              <>
                <div className="bag-items">
                  {products.filter((product) => bag.some((item) => item.id === product.id)).map((product) => {
                    const quantity = bag.filter((item) => item.id === product.id).length
                    return (
                      <div className="bag-item" key={product.id}>
                        <img src={product.image} alt="" />
                        <div className="bag-item-info"><h3>{product.name}</h3><p>{product.family}</p><div className="quantity-control"><button type="button" aria-label={`Remove one ${product.name}`} onClick={() => removeFromBag(product.id)}><Minus size={13} /></button><span>{quantity}</span><button type="button" aria-label={`Add one ${product.name}`} onClick={() => addToBag(product)}><Plus size={13} /></button></div></div>
                        <span className="bag-item-price">${product.price * quantity}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="bag-summary"><div><span>Subtotal</span><span>${bagTotal}</span></div><p>Shipping calculated at checkout.</p><button type="button" className="checkout-button">Continue to checkout <ArrowRight size={16} /></button></div>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  )
}

export default App
