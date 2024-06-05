from django.shortcuts import render
from django.http.response import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.response import JsonResponse, HttpResponse
from .models import Centrodistribuicao, CentrodistribuicaoHasRua, Destino, Estoque, Medicamento, Obstaculo, Registroestoque, Rua, DestinoHasRua, User
from .serializers import CentrodistribuicaoSerializer, CentrodistribuicaoHasRuaSerializer, DestinoSerializer, EstoqueSerializer, MedicamentoSerializer, ObstaculoSerializer, RegistroestoqueSerializer, RuaSerializer, DestinoHasRuaSerializer, UsersSerializer

class CentrodistribuicaoView(APIView):
    post = lambda self, request: (lambda serializer : serializer.save() if serializer.is_valid() else JsonResponse("Failed to Add", safe=False))(CentrodistribuicaoSerializer(data=request.data))

    get_centrodistribuicao = lambda self, pk : Centrodistribuicao.objects.get(idcentrodistribuicao = pk) if not Centrodistribuicao.DoesNotExist else HttpResponse(status=404) 
        
    def get(self, request, pk = None):
        if pk: #se tiver especificado um centro
            serializer = CentrodistribuicaoSerializer(self.get_centrodistribuicao(pk))
        else: #retorna todos os centros cadastrados
            serializer = CentrodistribuicaoSerializer(Centrodistribuicao.objects.all(), many = True)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        centrodistribuicao_to_update = Centrodistribuicao.objects.get(idcentrodistribuicao=pk)
        serializer = CentrodistribuicaoSerializer(instance=centrodistribuicao_to_update, data=request.data, partial=True)

        #partial = True para permitir atualizar apenas alguns campos, não todos necesariamente

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed To Update")
    
    def delete(self, request, pk):
        centrodistribuicao_to_delete = Centrodistribuicao.objects.get(idcentrodistribuicao=pk)
        centrodistribuicao_to_delete.delete()
        return JsonResponse("Deleted Successfully", safe=False)

class CentrodistribuicaoHasRuaView(APIView):
    post = lambda self, request: (lambda serializer : serializer.save() if serializer.is_valid() else JsonResponse("Failed to Add", safe=False))(CentrodistribuicaoHasRuaSerializer(data=request.data))
    
    def get_centrodistribuicaohasrua(self, pk):
        try:
            centrodistribhasrua = CentrodistribuicaoHasRua.objects.get(idcentrodistribuicao=pk) 
            return centrodistribhasrua
        except CentrodistribuicaoHasRua.DoesNotExist:
            raise Http404
        
    def get(self, request, pk = None):
        if pk: 
            serializer = CentrodistribuicaoHasRuaSerializer(self.get_centrodistribuicaohasrua(pk))
        else: 
            serializer = CentrodistribuicaoHasRuaSerializer(CentrodistribuicaoHasRua.objects.all(), many = True)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        centrodistribuicaohasrua_to_update = CentrodistribuicaoHasRua.objects.get(idcentrodistribuicao=pk)
        serializer = CentrodistribuicaoHasRuaSerializer(instance=centrodistribuicaohasrua_to_update, data=request.data, partial=True)

        #partial = True para permitir atualizar apenas alguns campos, não todos necesariamente

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed To Update")
    
    def delete(self, request, pk):
        centrodistribuicaohasrua_to_delete = CentrodistribuicaoHasRua.objects.get(idcentrodistribuicao=pk)
        centrodistribuicaohasrua_to_delete.delete()
        return JsonResponse("Deleted Successfully", safe=False)

class DestinoView(APIView):
    def post(self, request):
        serializer = DestinoSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    
    def get_destino(self, pk):
        try:
            destino = Destino.objects.get(iddestino=pk)
            return destino
        except Destino.DoesNotExist:
            raise Http404
        
    def get(self, request, pk = None):
        if pk:
            serializer = DestinoSerializer(self.get_destino(pk))
        else:
            serializer = DestinoSerializer(Destino.objects.all(), many = True)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        destino_to_update = Destino.objects.get(iddestino=pk)
        serializer = DestinoSerializer(instance=destino_to_update, data=request.data, partial=True)

        #partial = True para permitir atualizar apenas alguns campos, não todos necesariamente

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed To Update")
    
    def delete(self, request, pk):
        destino_to_delete = Destino.objects.get(iddestino=pk)
        destino_to_delete.delete()
        return JsonResponse("Deleted Successfully", safe=False)

class DestinoHasRuaView(APIView):
    def post(self, request):
        serializer = DestinoHasRuaSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)

    def get_destinohasrua(self, pk):
        try:
            destinohasrua = DestinoHasRua.objects.get(rua_idrua=pk)
            return destinohasrua
        except DestinoHasRua.DoesNotExist:
            raise Http404
        
    def get(self, request, pk = None):
        if pk:
            serializer = DestinoHasRuaSerializer(self.get_destinohasrua(pk))
        else:
            serializer = DestinoHasRuaSerializer(DestinoHasRua.objects.all(), many = True)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        destinohasrua_to_update = DestinoHasRua.objects.get(rua_idrua=pk)
        serializer = DestinoHasRuaSerializer(instance=destinohasrua_to_update, data=request.data, partial=True)

        #partial = True para permitir atualizar apenas alguns campos, não todos necesariamente

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed To Update")
    
    def delete(self, request, pk):
        destinohasrua_to_delete = DestinoHasRua.objects.get(rua_idrua=pk)
        destinohasrua_to_delete.delete()
        return JsonResponse("Deleted Successfully", safe=False)

class EstoqueView(APIView):
    def post(self, request):
        serializer = EstoqueSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    
    def get_estoque(self, pk):
        try:
            estoque = Estoque.objects.get(idestoque=pk)
            return estoque
        except Estoque.DoesNotExist:
            raise Http404
        
    def get(self, request, pk = None):
        if pk:
            serializer = EstoqueSerializer(self.get_estoque(pk))
        else:
            serializer = EstoqueSerializer(Estoque.objects.all(), many = True)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        estoque_to_update = Estoque.objects.get(idestoque=pk)
        serializer = EstoqueSerializer(instance=estoque_to_update, data=request.data, partial=True)

        #partial = True para permitir atualizar apenas alguns campos, não todos necesariamente

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed To Update")
    
    def delete(self, request, pk):
        estoque_to_delete = Estoque.objects.get(idestoque=pk)
        estoque_to_delete.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    
class MedicamentoView(APIView):
    def post(self, request):
        serializer = MedicamentoSerializer(data=request.data)

        if serializer.is_valid():
            medParaAdicionar = serializer.validated_data.get("nome")
            try:
                medEncontrado = Medicamento.objects.get(nome=medParaAdicionar)
                if(medEncontrado):
                    return JsonResponse("Medicamento já cadastrado", safe = False)
            except:
                serializer.save()
                return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    
    def get_medicamento(self, pk):
        try:
            med = Medicamento.objects.get(idmedicamento=pk)
            return med
        except Medicamento.DoesNotExist:
            raise Http404
        
    def get(self, request, pk = None):
        if pk:
            serializer = MedicamentoSerializer(self.get_medicamento(pk))
        else:
            estoques = Estoque.objects.all()

            medicamentos_estoque = lambda : [ medicamento for medicamento in list(Medicamento.objects.all()) if Estoque.objects.get(idestoque=medicamento.estoque_idestoque.idestoque) and int(medicamento.estoque_idestoque.qtdtotal) > 0 ]

            serializer = MedicamentoSerializer(medicamentos_estoque(), many = True)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        med_to_update = Medicamento.objects.get(idmedicamento=pk)
        # serializer = MedicamentoSerializer(instance=med_to_update, data=request.data, partial=True)

        montar_serializer = lambda s1 : lambda s2 : lambda s3 : MedicamentoSerializer(instance=s1, data=s2, partial=s3)
        serializer = montar_serializer(med_to_update)(request.data)(True)

        #partial = True para permitir atualizar apenas alguns campos, não todos necesariamente

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed To Update")
    
    def delete(self, request, pk):
        med_to_delete = Medicamento.objects.get(idmedicamento=pk)
        med_to_delete.delete()
        return JsonResponse("Deleted Successfully", safe=False)

class ObstaculoView(APIView):
    post = lambda self, request: (lambda serializer : serializer.save() if serializer.is_valid() else JsonResponse("Failed to Add", safe=False))(ObstaculoSerializer(data=request.data))
    
    def get_obstaculo(self, pk):
        try:
            obstaculo = Obstaculo.objects.get(idobstaculo=pk)
            return obstaculo
        except Obstaculo.DoesNotExist:
            raise Http404
        
    def get(self, request, pk = None):
        if pk:
            serializer = ObstaculoSerializer(self.get_obstaculo(pk))
        else:
            serializer = ObstaculoSerializer(Obstaculo.objects.all(), many = True)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        obstaculo_to_update = Obstaculo.objects.get(idobstaculo=pk)
        serializer = ObstaculoSerializer(instance=obstaculo_to_update, data=request.data, partial=True)

        #partial = True para permitir atualizar apenas alguns campos, não todos necesariamente

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed To Update")
    
    def delete(self, request, pk):
        obstaculo_to_delete = Obstaculo.objects.get(idobstaculo=pk)
        obstaculo_to_delete.delete()
        return JsonResponse("Deleted Successfully", safe=False)

class RegistroestoqueView(APIView):
    post = lambda self, request: (lambda serializer : serializer.save() if serializer.is_valid() else JsonResponse("Failed to Add", safe=False))(RegistroestoqueSerializer(data=request.data))
    
    def get_registroestoque(self, pk):
        try:
            registroestoque = Registroestoque.objects.get(idregistroestoque=pk)
            return registroestoque
        except Registroestoque.DoesNotExist:
            raise Http404
        
    def get(self, request, pk = None):
        if pk:
            serializer = RegistroestoqueSerializer(self.get_registroestoque(pk))
        else:
            serializer = RegistroestoqueSerializer(Registroestoque.objects.all(), many = True)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        registroestoque_to_update = Registroestoque.objects.get(idregistroestoque=pk)
        serializer = RegistroestoqueSerializer(instance=registroestoque_to_update, data=request.data, partial=True)

        #partial = True para permitir atualizar apenas alguns campos, não todos necesariamente

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed To Update")
    
    def delete(self, request, pk):
        registroestoque_to_delete = Registroestoque.objects.get(idregistroestoque=pk)
        registroestoque_to_delete.delete()
        return JsonResponse("Deleted Successfully", safe=False)

class RuaView(APIView):
    def post(self, request):
        serializer = RuaSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    
    def get_rua(self, pk):
        try:
            rua = Rua.objects.get(idrua=pk)
            return rua
        except Rua.DoesNotExist:
            raise Http404
        
    def get(self, request, pk = None):
        if pk:
            serializer = RuaSerializer(self.get_rua(pk))
        else:
            serializer = RuaSerializer(Rua.objects.all(), many = True)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        rua_to_update = Rua.objects.get(idrua=pk)
        serializer = RuaSerializer(instance=rua_to_update, data=request.data, partial=True)

        #partial = True para permitir atualizar apenas alguns campos, não todos necesariamente

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed To Update")
    
    def delete(self, request, pk):
        rua_to_delete = Rua.objects.get(idrua=pk)
        rua_to_delete.delete()
        return JsonResponse("Deleted Successfully", safe=False)

class LoginUserView(APIView):

    def post(self, request):
        fcrypt = lambda b, c, v: (b and chr (ord (c) + v) or (not b and chr (ord (c) - v)))
        fencrypt = lambda c : fcrypt(True, c, 1)
        join = lambda l : "".join(str(x) for x in l)

        #monad?
        cesar = lambda f, s: join([f(x) for x in list(s)]) if len(s) > 0 else HttpResponse(status=400) 

        serializer = UsersSerializer(request.data)
        emailLogin = serializer.data.get("email")
        try:
            usuarioEncontrado = User.objects.get(email=emailLogin)
            senhaLogin = cesar(fencrypt, serializer.data.get("senhaHash")) 
            if(usuarioEncontrado.senhaHash != senhaLogin):
                raise Http404
            
            return JsonResponse("Usuario autenticado com sucesso", safe=False)
        except User.DoesNotExist:
            raise Http404

# Create your views here.
