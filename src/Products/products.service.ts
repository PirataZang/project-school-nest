import { Injectable } from '@nestjs/common';
import { productDto } from './products.dto';
import { PrismaService } from 'src/prismaService';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async create(data: productDto) {
    const product = await this.prisma.products.create({ data })
    return product
  }

  findAll() {
    return this.prisma.products.findMany();
  }

  async findOne(id: number) {
    this.verify(id)
    const product = await this.prisma.products.findUnique({ where: { id } })
    return product
  }

  async update(id: number, data: productDto) {

    this.verify(id)

    const product = await this.prisma.products.update({
      data,
      where: {
        id,
      }
    })
    return product
  }

  remove(id: number) {
    this.verify(id)

    return this.prisma.products.delete({
      where: {
        id
      }
    })
  }






  //? #################
  //? ### FUNCTIONS ###
  //? #################

  async verify(id) {
    const productExists = await this.prisma.products.findUnique({
      where: {
        id
      }
    })

    if (!productExists)
      throw new Error("Produto não encontrado")
  }
}
