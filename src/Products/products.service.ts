import { Injectable } from '@nestjs/common';
import { productDto } from './products.dto';
import { PrismaService } from 'src/prismaService';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async create(data: productDto) {
    const productExists = await this.prisma.products.findFirst({
      where: {
        name: data.name
      }
    })

    if (productExists)
      throw new Error('Já existe um Item com este Nome');

    const product = await this.prisma.products.create({ data })
    return product
  }

  findAll() {
    return this.prisma.products.findMany();
  }

  async findOne(id: number) {
    const productExists = await this.prisma.products.findUnique({
      where: {
        id
      }
    })

    if (!productExists)
      throw new Error("Produto não encontrado")

    const product = await this.prisma.products.findUnique({ where: { id } })
    return product
  }

  async update(id: number, data: productDto) {

    const productExists = await this.prisma.products.findUnique({
      where: {
        id
      }
    })

    if (!productExists)
      throw new Error("Produto não encontrado")

    const product = await this.prisma.products.update({
      data,
      where: {
        id,
      }
    })
    return product
  }

  async remove(id: number) {
    const productExists = await this.prisma.products.findUnique({
      where: {
        id
      }
    })

    if (!productExists)
      throw new Error("Produto não encontrado")

    return this.prisma.products.delete({
      where: {
        id
      }
    })
  }

  async findMany(name: string) {
    const product = await this.prisma.products.findMany({
      where: {
        name: {
          contains: name,
        }
      }
    });

    return product
  }

  findManyProducts(name: string) {
    return this.prisma.products.findMany({
      where: {
        name: {
          contains: name,  // Realiza a busca por substrings
        }
      }
    });
  }

}
