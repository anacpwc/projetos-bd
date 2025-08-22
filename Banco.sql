create table cliente (
 id_cliente integer primary key identity,
 nome varchar(50) not null,
 tipo_conta varchar(50),
 saldo smallmoney not null
)

create table transferencia (
	id_transferencia integer primary key identity,
	id_cliente integer,
	foreign key (id_cliente) references cliente(id_cliente),
	tipo_transf varchar(50),
	data_tranf date not null,
	valor_transf smallmoney not null,
)

go

insert into cliente values ('josé', 'normal', 1000)

go

create trigger semsaldo
on transferencia after
insert as 
	begin
	declare @valor_check smallmoney 
	declare @saldo smallmoney
	declare @conta int

	select
	@valor_check = inserted.valor_transf,
	@conta = inserted.id_cliente
	from inserted

	select @saldo = saldo from cliente where id_cliente = @conta

	if @valor_check > @saldo 
		begin
			rollback
			raiserror('saldo insuficiente!', 16, 1)
		end
	end

insert into transferencia values (1, 'normal', '21/08/2025', 500)