/**
 *
 * @author pwcla
 */
public class Pessoa {
    private int id;
    private String nome;
    private String sexo;
    private String idioma;
    public int getId(){
        return id;
    }
    public String getNome(){
        return nome;
    }
    public String getSexo(){
        return idioma;
    }
    public void setId(int id){
        this.id = id;
    }
    public String getIdioma(){
        return(idioma);
    }
    public void setNome(String nome){
        this.nome = nome;
    }
    public void setSexo(String sexo){
        this.sexo = sexo;
    }
    public void setIdioma(String idioma){
        this.idioma = idioma;
    }
}
