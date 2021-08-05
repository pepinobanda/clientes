import pool from "../database/database";

class ClienteDAO {
    public async lista() {
        const result  = await pool.then(async (connection) => {
            return await connection.query("SELECT u.cveCliente, u.nombre, u.apellidos, u.cveUsuarioFK, u.tipoCliente, r.descripcion as rol FROM cliente u JOIN rol r ON r.cveRol = u.tipoCliente ORDER BY u.nombre, u.apellidos ASC");
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
}

export const dao = new ClienteDAO();