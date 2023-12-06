import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import * as jwt from "jsonwebtoken"
import { PrismaService } from "src/prisma/prisma.service"
import { UserInfo } from '../users/interface/users.interface'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        private readonly prismaService: PrismaService) { }

    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass(),
        ])

        if (roles.length) {
            const request = context.switchToHttp().getRequest()
            const token = request?.headers?.authorization?.split('Bearer ')[1]
            try {
                const payload = await jwt.verify(token, "gsadihq289u0-deuhd0ewiofhis8-wq7217bdioq-26w8a") as UserInfo
                const user = await this.prismaService.user.findUnique({
                    where: {
                        id: payload.id
                    }
                })
                if (!user) {
                    return false
                } else if (roles.includes(user.userType)) {
                    return true
                } else {
                    return false
                }
            } catch (error) {
                return false
            }
        }
        return true
    }
}