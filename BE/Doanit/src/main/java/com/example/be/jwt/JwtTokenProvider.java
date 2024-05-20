package com.example.be.jwt;

import com.example.be.security.UserPrinciple;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Slf4j
//@Slf4j của tv Lombok, dsd để tự động tạo ra một đối tượng Logger của SLF4J
public class JwtTokenProvider {
    private String JWT_SECRET="LoiTH";
//    private int JWT_EXPIRATION=3600*1000;
    private int JWT_EXPIRATION=10*60*1000;

    public String genarateToken(UserPrinciple userPrinciple){
        Date now= new Date();
        Date dateExpired = new Date(now.getTime()+JWT_EXPIRATION);
        //Tạo jwt từ useName
        return Jwts.builder().setSubject(userPrinciple.getUsername())
                .setIssuedAt(now)
                .setExpiration(dateExpired)
                .signWith(SignatureAlgorithm.HS512,JWT_SECRET)
                .compact();
    }

    public String getUserNameFormJWT(String token){
        //Thông tin dc lưu trữ ở Claims
        Claims claims=Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
    public boolean validateToken(String token){
        try{
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token);
            return true;
        }catch (SignatureException e){
            log.error("Invalid JWT signature");
        } catch (MalformedJwtException e){
            log.error("Invalid format Token");
        } catch (ExpiredJwtException e){
            log.error("Expired JWT Token");
        } catch (UnsupportedJwtException e){
            log.error("Unsupported JWT Token");
        } catch (IllegalArgumentException e){
            log.error("JWT claims String is empty");
        }
        return false;
    }



}
