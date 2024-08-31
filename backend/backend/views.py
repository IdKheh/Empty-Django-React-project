from rest_framework.decorators import api_view
from rest_framework.response import Response

# to test communicate with rest:
#  http://localhost:8000/test/?modelsNLP=[gpt,bert]&methods=[x,y,z]&textThema=costam,costam


class ModelResult:
    def __init__(self, name):
        self.nameModel = name
        self.listOfMethods = []
        
    def addMethod(self, methodResult):
        self.listOfMethods.append(methodResult)

    def to_dict(self):
        return {
            "nameModel": self.nameModel,
            "methodsResult": [method.to_dict() for method in self.listOfMethods]
        }
    

class MethodResult:
    def __init__(self, name, value):
        self.nameMethod = name
        self.value = value

    def to_dict(self):
        return {
            "nameMethod": self.nameMethod,
            "value": self.value
        }
    

@api_view(['GET'])
def send_some_data(request):
    modelsNLP = request.GET.get('modelsNLP', '').strip('[]').split(',')
    methods = request.GET.get('methods', '').strip('[]').split(',')
    textThema = request.GET.get('textThema', '')

    modelsNLP = [model.strip() for model in modelsNLP if model.strip()]
    methods = [method.strip() for method in methods if method.strip()]
    
    print(modelsNLP)
    print(methods)
    print(textThema)

    if not modelsNLP:
        return Response({"message": "Error: Empty modelsNLP"})

    response_data = []
    
    for i, model_name in enumerate(modelsNLP):
        model_result = ModelResult(name=model_name)
        
        for j, method_name in enumerate(methods):
            method_value = j + i * 10
            method_result = MethodResult(name=method_name, value=method_value)
            model_result.addMethod(method_result)
        
        response_data.append(model_result.to_dict())

    return Response({"message": response_data})