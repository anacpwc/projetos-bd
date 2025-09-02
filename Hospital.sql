create database hospital;

go

create table paciente (
	id_paciente integer primary key identity,
	nome varchar(100),
	cpf varchar(12), 
	endereco varchar(200),
	dataNascimento date,
	SysStartTime datetime2 generated always as row start not null,
	SysEndTime datetime2 generated always as row end not null,
	period for system_time(SysStartTime, SysEndTime)
)
with
(
	SYSTEM_VERSIONING = ON (History_table = dbo.HistoricoPaciente)
);

go

create table medico (
	id_medico integer primary key identity,
	nome varchar(100),
	cpf varchar(12),
	crm varchar(20),
	especialidade varchar(100),
	cargo varchar(100),
	enderecoMedico varchar(200),
	salario smallmoney,
	SysStartTime datetime2 generated always as row start not null,
	SysEndTime datetime2 generated always as row end not null,
	period for system_time(SysStartTime, SysEndTime)
)
with
(
	SYSTEM_VERSIONING = ON (History_table = dbo.HistoricoMedico)
);

go

create table exame (
	id_exame integer primary key identity,
	id_paciente integer,
	foreign key (id_paciente) references paciente(id_paciente),
	id_medico integer,
	foreign key (id_medico) references medico(id_medico),
	tipoExame varchar(200),
	dataExame date,
	SysStartTime datetime2 generated always as row start not null,
	SysEndTime datetime2 generated always as row end not null,
	period for system_time(SysStartTime, SysEndTime)
)
with
(
	SYSTEM_VERSIONING = ON (History_table = dbo.HistoricoExame)
);

go

create table consulta (
	id_consulta integer primary key identity,
	id_paciente integer,
	foreign key (id_paciente) references paciente(id_paciente),
	id_medico integer,
	foreign key (id_medico) references medico(id_medico),
	id_exame integer,
	foreign key (id_exame) references exame(id_exame),
	dataConsulta date,
	SysStartTime datetime2 generated always as row start not null,
	SysEndTime datetime2 generated always as row end not null,
	period for system_time(SysStartTime, SysEndTime)
)
with
(
	SYSTEM_VERSIONING = ON (History_table = dbo.HistoricoConsulta)
);

go

insert into paciente (nome, cpf, endereco, dataNascimento)
values ('Ana Clara Souza', '12345678901', 'Salto - Jardim das Flores', '1988-03-14');

insert into paciente (nome, cpf, endereco, dataNascimento)
values ('Pietro Martins', '98765432100', 'Salto - Centro Histórico', '1995-05-20');

insert into paciente (nome, cpf, endereco, dataNascimento)
values ('Carlos Henrique', '45612378955', 'Itu - Vila Nova', '1978-10-02');

insert into medico (nome, cpf, crm, especialidade, cargo, enderecoMedico, salario)
values ('Dr. Gabriel Mendes', '32165498700', 'CRM123456-SP', 'Cardiologista', 'Médico Titular', 'Salto - Jardim Panorama', 25000);

insert into medico (nome, cpf, crm, especialidade, cargo, enderecoMedico, salario)
values ('Dra. Mariana Lopes', '65498732100', 'CRM654321-SP', 'Endocrinologista', 'Médica Residente', 'Capivari - Centro', 18000);

insert into medico (nome, cpf, crm, especialidade, cargo, enderecoMedico, salario)
values ('Dr. Ricardo Nogueira', '15975346820', 'CRM789123-SP', 'Ortopedista', 'Médico Titular', 'Itu - Vila Nova', 22000);

insert into exame (id_paciente, id_medico, tipoExame, dataExame) 
values (1, 1, 'Eletrocardiograma', '2025-07-11');

insert into exame (id_paciente, id_medico, tipoExame, dataExame) 
values (2, 2, 'Exame de sangue - glicemia', '2025-08-05');

insert into exame (id_paciente, id_medico, tipoExame, dataExame) 
values (3, 3, 'Raio-X da perna direita', '2025-08-15');

insert into consulta (id_paciente, id_medico, id_exame, dataConsulta)
values (1, 1, 1, '2025-07-24');

insert into consulta (id_paciente, id_medico, id_exame, dataConsulta)
values (2, 2, 2, '2025-08-10');

insert into consulta (id_paciente, id_medico, id_exame, dataConsulta)
values (3, 3, 3, '2025-08-20');


select * from paciente;
select * from medico;
select * from exame;
select * from consulta;

update paciente set nome = 'Artur Henrique' where id_paciente = 1
update medico set nome = 'Heber' where id_medico = 1
update exame set tipoExame = 'Colonoscopia' where id_exame = 1

	alter table paciente
	set (system_versioning = off)

	alter table medico
	set (system_versioning = off)

	alter table exame
	set (system_versioning = off)

	alter table consulta
	set (system_versioning = off)

	select * from paciente
	select * from dbo.HistoricoPaciente

	select * from medico
	select * from dbo.HistoricoMedico

	select * from exame
	select * from dbo.HistoricoExame


