from django.conf.urls import patterns,include,url
from rest_framework.urlpatterns import format_suffix_patterns
from band import views

urlpatterns =  patterns('',

                url(r'^api/$',views.BandList.as_view()),
                url(r'^api/(?P<pk>[0-9]+)/$',views.BandDetail.as_view()),
                url(r'^(?P<band_id>\d+)','band.views.band'),
                #url(r'$','band.views.all_bands'),

                )


urlpatterns = format_suffix_patterns(urlpatterns)
