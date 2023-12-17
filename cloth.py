
def clothing_(value):
    response_dict = {
            (-100, 24): "Wear a winter jacket and gloves because its freezing",
            (25, 44): "I would reccomend wearing a coat",
            (45, 64): "A fleece sweater or a light hoodie should be fine",
            (65, 79): "The weather is really nice so wear some short sleeves ",
            (80, 140): "Its really hot outside so wear some shorts ",
        }
    
    for key in response_dict:
        if key[0] <= value <= key[1]:
            return response_dict[key]
        
    return " You entered an invalid temperature"


in_ = int(input(" Enter the temperature outside: "))
print(clothing_(in_))