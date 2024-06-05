# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Centrodistribuicao(models.Model):
    idcentrodistribuicao = models.AutoField(db_column='idCentroDistribuicao', primary_key=True)  # Field name made lowercase.
    nome = models.CharField(db_column='Nome', max_length=45)  # Field name made lowercase.
    cnpj = models.CharField(db_column='CNPJ', max_length=80)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'centrodistribuicao'


class CentrodistribuicaoHasRua(models.Model):
    centrodistribuicao_idcentrodistribuicao = models.OneToOneField(Centrodistribuicao, models.DO_NOTHING, db_column='CentroDistribuicao_idCentroDistribuicao', primary_key=True)  # Field name made lowercase. The composite primary key (CentroDistribuicao_idCentroDistribuicao, Rua_idRua) found, that is not supported. The first column is selected.
    rua_idrua = models.ForeignKey('Rua', models.DO_NOTHING, db_column='Rua_idRua')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'centrodistribuicao_has_rua'
        unique_together = (('centrodistribuicao_idcentrodistribuicao', 'rua_idrua'),)


class Destino(models.Model):
    iddestino = models.AutoField(db_column='idDestino', primary_key=True)  # Field name made lowercase. The composite primary key (idDestino, Rua_idRua) found, that is not supported. The first column is selected.
    nome = models.CharField(db_column='Nome', max_length=45, blank=True, null=True)  # Field name made lowercase.
    farmacia = models.IntegerField(db_column='Farmacia', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'destino'
        unique_together = (('iddestino'),)


class DestinoHasRua(models.Model):
    destino_iddestino = models.OneToOneField(Destino, models.DO_NOTHING, db_column='Destino_idDestino', primary_key=True)  # Field name made lowercase. The composite primary key (Destino_idDestino, Destino_Rua_idRua, Rua_idRua) found, that is not supported. The first column is selected.  # Field name made lowercase.
    rua_idrua = models.ForeignKey('Rua', models.DO_NOTHING, db_column='Rua_idRua')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'destino_has_rua'
        unique_together = (('destino_iddestino', 'rua_idrua'),)


class Estoque(models.Model):
    idestoque = models.AutoField(db_column='idEstoque', primary_key=True)  # Field name made lowercase. The composite primary key (idEstoque, CentroDistribuicao_idCentroDistribuicao) found, that is not supported. The first column is selected.
    qtdtotal = models.CharField(db_column='QtdTotal', max_length=150, blank=True, null=True)  # Field name made lowercase.
    centrodistribuicao_idcentrodistribuicao = models.ForeignKey(Centrodistribuicao, models.DO_NOTHING, db_column='CentroDistribuicao_idCentroDistribuicao')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'estoque'
        unique_together = (('idestoque', 'centrodistribuicao_idcentrodistribuicao'),)


class Medicamento(models.Model):
    idmedicamento = models.AutoField(db_column='idMedicamento', primary_key=True)  # Field name made lowercase. The composite primary key (idMedicamento, Estoque_idEstoque) found, that is not supported. The first column is selected.
    nome = models.CharField(db_column='Nome', max_length=65)  # Field name made lowercase.
    doserecomendada = models.CharField(db_column='DoseRecomendada', max_length=45, blank=True, null=True)  # Field name made lowercase.
    marca = models.CharField(db_column='Marca', max_length=45, blank=True, null=True)  # Field name made lowercase.
    validade = models.DateField(db_column='Validade')  # Field name made lowercase.
    estoque_idestoque = models.ForeignKey(Estoque, models.DO_NOTHING, db_column='Estoque_idEstoque')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'medicamento'
        unique_together = (('idmedicamento', 'estoque_idestoque'),)


class Obstaculo(models.Model):
    idobstaculo = models.AutoField(db_column='idObstaculo', primary_key=True)  # Field name made lowercase. The composite primary key (idObstaculo, Rua_idRua) found, that is not supported. The first column is selected.
    nome = models.CharField(db_column='Nome', max_length=45, blank=True, null=True)  # Field name made lowercase.
    penalidade = models.CharField(db_column='Penalidade', max_length=45, blank=True, null=True)  # Field name made lowercase.
    rua_idrua = models.ForeignKey('Rua', models.DO_NOTHING, db_column='Rua_idRua')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'obstaculo'
        unique_together = (('idobstaculo', 'rua_idrua'),)


class Registroestoque(models.Model):
    idregistroestoque = models.AutoField(db_column='idRegistroEstoque', primary_key=True)  # Field name made lowercase. The composite primary key (idRegistroEstoque, Estoque_idEstoque) found, that is not supported. The first column is selected.
    metodo = models.CharField(max_length=45, blank=True, null=True)
    quantidade = models.IntegerField(blank=True, null=True)
    dataregistro = models.DateTimeField(blank=True, null=True)
    estoque_idestoque = models.ForeignKey(Estoque, models.DO_NOTHING, db_column='Estoque_idEstoque')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'registroestoque'
        unique_together = (('idregistroestoque', 'estoque_idestoque'),)


class Rua(models.Model):
    idrua = models.AutoField(db_column='idRua', primary_key=True)  # Field name made lowercase.
    nome = models.CharField(db_column='Nome', max_length=45, blank=True, null=True)  # Field name made lowercase.
    velocidademax = models.CharField(db_column='VelocidadeMax', max_length=45, blank=True, null=True)  # Field name made lowercase.
    tempo = models.CharField(db_column='Tempo', max_length=45, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'rua'

class User(models.Model):
    idUsers = models.AutoField(db_column='idUsers', primary_key=True)
    email = models.CharField(db_column='Email', max_length=150, blank=False, null=False)
    senhaHash = models.CharField(db_column='SenhaHash', max_length=150, blank=False, null=False)

    class Meta:
        managed = False
        db_table = 'users'