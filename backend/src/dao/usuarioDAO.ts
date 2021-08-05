import pool from "../database/database";

class UsuarioDAO {
    public async lista() {
        const result  = await pool.then(async (connection) => {
            return await connection.query("SELECT u.cveUsuario, u.nombre, u.apellidos, u.username, u.fechaRegistro, u.cveRol, r.descripcion as rol FROM usuario u JOIN rol r ON r.cveRol = u.cveRol ORDER BY u.nombre, u.apellidos ASC");
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
            return await connection.query("INSERT INTO usuario SET ?", [user]);
        });
        return result;
        
    }
}

export const dao = new UsuarioDAO();