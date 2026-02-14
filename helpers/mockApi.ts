import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_SUPPLIERS } from './mockData'
import type { Product, Category, Supplier } from './mockData'

function delay(ms = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms + Math.random() * 200))
}

let products = [...MOCK_PRODUCTS]
let categories = [...MOCK_CATEGORIES]
let suppliers = [...MOCK_SUPPLIERS]

export const mockApi = {
  products: {
    async getAll(): Promise<Product[]> {
      await delay()
      return [...products]
    },
    async create(data: Omit<Product, 'id'>): Promise<Product> {
      await delay()
      const product = { ...data, id: String(Date.now()) }
      products.push(product)
      return product
    },
    async delete(id: string): Promise<void> {
      await delay()
      products = products.filter(p => p.id !== id)
    }
  },
  categories: {
    async getAll(): Promise<Category[]> {
      await delay()
      return [...categories]
    }
  },
  suppliers: {
    async getAll(): Promise<Supplier[]> {
      await delay()
      return [...suppliers]
    }
  }
}
