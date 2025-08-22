create table produtos (
	id_produto integer primary key identity,
	nome varchar(30),
	estoque int,
	categoria varchar(50),
	preco_un smallmoney not null
)
 
create table vendas (
	id integer primary key identity,
	id_produto integer,
	foreign key (id_produto) references produtos(id_produto),
	vendedor varchar(50),
	cpf_cliente varchar(12),
	quantidade_vendas integer not null,
	preco smallmoney not null
)

go

create trigger vendastrigger 
on vendas after insert as 
	begin
		update produtos set estoque = estoque - inserted.quantidade_vendas
		from produtos, inserted
		where produtos.id_produto = inserted.id_produto

		update vendas set preco = inserted.quantidade_vendas * preco_un 
		from vendas
		inner join inserted ON vendas.id = inserted.id
		inner join produtos ON inserted.id_produto = produtos.id_produto
	end

insert into produtos values ('notebook', 30, 'tech', 5000)
insert into vendas values (1, 'joão silva', 000000000000, 1, 5000)

select * from produtos
select * from vendas

go

create trigger negativotrigger
on produtos
after insert, update
as
begin
    if exists (
        select 1
        from inserted
        where preco_un <= 0
    )
    begin
        rollback;
        raiserror('o preço não pode ser menor ou igual a zero!', 16, 1);
    end
end

insert into produtos values ('smartphone', 50, 'tech', 2000)

update produtos
set preco_un = -10
where id_produto = 1
 
 