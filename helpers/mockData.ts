export interface Product {
  id: string
  name: string
  category: string
  supplier: string
  quantity: number
  price: number
}

export interface Category {
  id: string
  name: string
  description: string
}

export interface Supplier {
  id: string
  name: string
  city: string
  email: string
}

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Elettronica', description: 'Dispositivi e componenti elettronici' },
  { id: '2', name: 'Ferramenta', description: 'Utensili e materiali da costruzione' },
  { id: '3', name: 'Cancelleria', description: 'Materiale per ufficio' },
  { id: '4', name: 'Sicurezza', description: 'DPI e dispositivi di sicurezza' },
]

export const MOCK_SUPPLIERS: Supplier[] = [
  { id: '1', name: 'TechParts Srl', city: 'Milano', email: 'info@techparts.it' },
  { id: '2', name: 'FerroBuild SpA', city: 'Torino', email: 'ordini@ferrobuild.it' },
  { id: '3', name: 'CartaPlus', city: 'Bologna', email: 'vendite@cartaplus.it' },
]

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Cavo HDMI 2m', category: 'Elettronica', supplier: 'TechParts Srl', quantity: 150, price: 8.90 },
  { id: '2', name: 'Trapano a batteria', category: 'Ferramenta', supplier: 'FerroBuild SpA', quantity: 12, price: 89.00 },
  { id: '3', name: 'Risma A4 500 fogli', category: 'Cancelleria', supplier: 'CartaPlus', quantity: 300, price: 4.50 },
  { id: '4', name: 'Caschetto protettivo', category: 'Sicurezza', supplier: 'FerroBuild SpA', quantity: 45, price: 25.00 },
  { id: '5', name: 'Adattatore USB-C', category: 'Elettronica', supplier: 'TechParts Srl', quantity: 80, price: 12.50 },
  { id: '6', name: 'Set cacciaviti', category: 'Ferramenta', supplier: 'FerroBuild SpA', quantity: 30, price: 15.00 },
  { id: '7', name: 'Penna blu (conf. 50)', category: 'Cancelleria', supplier: 'CartaPlus', quantity: 200, price: 9.00 },
  { id: '8', name: 'Gilet alta visibilita', category: 'Sicurezza', supplier: 'FerroBuild SpA', quantity: 60, price: 18.00 },
]
