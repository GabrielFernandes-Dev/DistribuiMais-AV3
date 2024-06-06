from rest_framework import serializers
from .models import Centrodistribuicao, CentrodistribuicaoHasRua, Destino, Estoque, Medicamento, Obstaculo, Registroestoque, Rua, DestinoHasRua, User

class CentrodistribuicaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Centrodistribuicao
        fields = ('idcentrodistribuicao','nome','cnpj')

class CentrodistribuicaoHasRuaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CentrodistribuicaoHasRua
        fields = ('centrodistribuicao_idcentrodistribuicao', 'rua_idrua')

class DestinoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destino
        fields = ('iddestino', 'nome', 'farmacia')

class EstoqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estoque
        fields = ('idestoque', 'qtdtotal', 'centrodistribuicao_idcentrodistribuicao')

class MedicamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicamento
        fields = ('idmedicamento', 'nome', 'doserecomendada', 'marca', 'validade', 'estoque_idestoque')

class ObstaculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Obstaculo
        fields = ('idobstaculo', 'nome', 'penalidade', 'rua_idrua')

class RegistroestoqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registroestoque
        fields = ('idregistroestoque', 'metodo', 'quantidade', 'dataregistro', 'estoque_idestoque')

class RuaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rua
        fields = ('idrua', 'nome', 'velocidademax', 'tempo')

class DestinoHasRuaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinoHasRua
        fields = ('destino_iddestino', 'rua_idrua')

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('idUsers', 'email', 'senhaHash')
