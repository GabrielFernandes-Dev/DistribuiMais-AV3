from django.contrib import admin
from .models import Centrodistribuicao, CentrodistribuicaoHasRua, Destino, Estoque, Medicamento, Obstaculo, Registroestoque, Rua

admin.site.register(Centrodistribuicao)
admin.site.register(CentrodistribuicaoHasRua)
admin.site.register(Destino)
admin.site.register(Estoque)
admin.site.register(Medicamento)
admin.site.register(Obstaculo)
admin.site.register(Registroestoque)
admin.site.register(Rua)

# Register your models here.
