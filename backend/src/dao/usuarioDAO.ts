import { token } from "morgan";
import pool from "../database/database";

class UsuarioDAO {
    public async lista() {
        const result  = await pool.then(async (connection) => {
            return await connection.query("SELECT u.cveCliente, u.nombre, u.apellidos, u.cveUsuarioFK, u.tipoCliente, r.descripcion as rol FROM cliente u JOIN rol r ON r.cveRol = u.tipoCliente ORDER BY u.nombre, u.apellidos ASC");
        });

        return result;
    }

    public async verificarUsuario(usuario: string) {
        const result = await pool.then(async (connection) => {
            return await connection.query('SELECT cveUsuario FROM usuario WHERE username = ?', [usuario]);
        });

        return result;
    }

    public async verificarRol(cveRol: number) {
        const result = await pool.then(async (connection) => {
            return await connection.query('SELECT * FROM rol WHERE cveRol = ? AND activo = ?', [cveRol, true]);
        });

        return result;
    }

    public async insert(user: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query("INSERT INTO cliente SET ?", [user]);
        });
        return result;
        
    }

    public async update(user: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query("UPDATE cliente SET ? WHERE cveCliente = ?", [user, user.cveCliente]);
        });
        return result;
    }
    
    public async delete(cveCliente: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query("DELETE FROM cliente WHERE cveCliente = ?", [cveCliente]);
        });
        return result;
        
    }

}

export const dao = new UsuarioDAO();