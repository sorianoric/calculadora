import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new BadRequestException('No se puede dividir entre cero');
    }

    return a / b;
  }
  
  squareRoot(a: number): number {
    if (a < 0) {
      throw new BadRequestException('No se puede calcular la raíz cuadrada de un número negativo');
    }

    return Math.sqrt(a);
  }

  power(a: number, b: number): number {
    return Math.pow(a, b);
  }

}
