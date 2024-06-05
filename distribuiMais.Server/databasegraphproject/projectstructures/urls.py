from django.urls import path
from .views import CentrodistribuicaoView, CentrodistribuicaoHasRuaView, DestinoView, EstoqueView, MedicamentoView, ObstaculoView, RegistroestoqueView, RuaView, DestinoHasRuaView, LoginUserView

urlpatterns = [
    path('projectstructures/centrodistribuicao', CentrodistribuicaoView.as_view()),
    path('projectstructures/centrodistribuicaohasrua', CentrodistribuicaoHasRuaView.as_view()),
    path('projectstructures/destino', DestinoView.as_view()),
    path('projectstructures/estoque', EstoqueView.as_view()),
    path('projectstructures/medicamento', MedicamentoView.as_view()),
    path('projectstructures/obstaculo', ObstaculoView.as_view()),
    path('projectstructures/registroestoque', RegistroestoqueView.as_view()),
    path('projectstructures/rua', RuaView.as_view()),
    path('projectstructures/destinohasrua', DestinoHasRuaView.as_view()),
    path('projectstructures/login',LoginUserView.as_view()),
    path('projectstructures/centrodistribuicao/<int:pk>/', CentrodistribuicaoView.as_view()),
    path('projectstructures/centrodistribuicaohasrua/<int:pk>/', CentrodistribuicaoHasRuaView.as_view()),
    path('projectstructures/destino/<int:pk>/', DestinoView.as_view()),
    path('projectstructures/estoque/<int:pk>/', EstoqueView.as_view()),
    path('projectstructures/medicamento/<int:pk>/', MedicamentoView.as_view()),
    path('projectstructures/obstaculo/<int:pk>/', ObstaculoView.as_view()),
    path('projectstructures/registroestoque/<int:pk>/', RegistroestoqueView.as_view()),
    path('projectstructures/rua/<int:pk>/', RuaView.as_view()),
    path('projectstructures/destinohasrua/<int:pk>/', DestinoHasRuaView.as_view())

]