import { Body, Controller, Param, Post, ParseIntPipe, UnauthorizedException } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordDTO, UpdatePasswordDTO } from './dto/forgot-password.dto';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'

@Controller('forgot-password')
export class ForgotPasswordController {

    constructor(private readonly password: ForgotPasswordService){}

    @Post()
    async forgotPassword(
        @Body() {email}: ForgotPasswordDTO
    ){
        try {
            const result = await this.password.forgotPassword(email);
            return result; 
          } catch (error) {
            throw new UnauthorizedException("Erro ao processar a solicitação de redefinição de senha");
          }
        }

    @Post(':id/:token')
    async updatePassword(
        @Param('id', ParseIntPipe) id: number,
        @Param('token') token: string,
        @Body() {password} : UpdatePasswordDTO
    ){
        const newToken = token.split(' ')[0]
    
        await jwt.verify(newToken, "gsadihq289u0-deuhd0ewiofhis8-wq7217bdioq-26w8a", async (err, decoded) => {
            if(err){
                console.log(err)
                throw new UnauthorizedException()
            } else {
                const hashPassword = await bcrypt.hash(password, 5)
                this.password.updatePassword(id, hashPassword)
               
            }
        })

        return {message: "Senha atualizada com sucesso!", statusCode: 201}


    }

}

