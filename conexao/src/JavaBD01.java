/**
 *
 * @author pwcla
 */
public class JavaBD01 {

 
    public static void main(String[] args) {
        Conexao c = new Conexao();
        c.getConexao();
        
        Pessoa p = new Pessoa();
        p.setNome("Ricardo");
        p.setSexo("M");
        p.setIdioma("PORTUGUÊS");
        
        PessoaDAO pDAO = new PessoaDAO();
        pDAO.inserir(p);
    }
    
}
