import prisma from '../prisma'; // adjust if needed

class ProductService {
  static async getAll() {
    return prisma.product.findMany();
  }

  static async search(query: string) {
    return prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
  }

  static async getById(id: string) {
    return prisma.product.findUnique({ where: { id } });
  }

  static async create(data: { name: string; description: string }) {
    return prisma.product.create({ data });
  }

  static async update(id: string, data: { name?: string; description?: string }) {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.product.delete({ where: { id } });
  }
}

export default ProductService;
