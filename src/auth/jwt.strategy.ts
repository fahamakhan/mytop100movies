import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    return {
      id: payload.id,
      first_name: payload.first_name,
      last_name: payload.last_name,
      role: payload.role,
      country_code: payload.country_code,
      phone: payload.phone,
      country: payload.country,
      email: payload.email,
    };
  }
}
