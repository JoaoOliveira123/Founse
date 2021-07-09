import asyncio
import json
import gzip
import re
import socket

def verify_ok(code):
    """Verify if the http code is 200 OK"""
    return re.sub('[^0-9]', '', code)[2:] < '400'

def make_http_header(dcn, http_code='HTTP/1.1 200 OK'):
    """It makes a http header with a dictionary, each item work as one header"""
    if not http_code.startswith('HTTP/'):
        http_code = 'HTTP/1.1' + http_code
    if not verify_ok(http_code):
        return http_code.encode('utf-8') + b'\r\n\r\n'
    string_dict = json.dumps(dcn)
    response_list = [
        ''.join(i + '\r\n').strip('{ }').replace('"', '').replace(' ', '').encode('utf-8')
        for i in string_dict.split('",')
        ]
    response_list[-1] += b'\r\n'
    http_response = b''
    for i in response_list:
        http_response += i
    return http_code.encode('utf-8') + b'\r\n' + http_response

async def receive_http_data(http_request) -> list:
    """It separate a http request and return only the data"""
    return http_request.split(b'\r\n\r\n')[1].decode('utf-8')

async def solve_recursive_objects(master, return_args, counter=0, **kwgs):
    """It get data with a recursive form with the args of this being other dictionary's arguments"""
    main = kwgs['main']
    keys = kwgs['keys']
    cause_error = kwgs['cause_error']
    atual_key = main[keys[counter]]
    atual_capitalized = capitalize_thing(atual_key)
    try:
        return_args[keys[counter]] = master[atual_capitalized]
        if len(return_args.keys()) > 1:
            return_args[keys[counter-1]] = capitalize_thing(main[atual_key])
        counter += 1
        if counter >= len(keys):
            return return_args
        return await solve_recursive_objects(master[atual_capitalized], return_args, counter, **kwgs)
    except KeyError:
        if cause_error[counter+1]:
            return 'error'
        return return_args

def capitalize_thing(obj: str):
    """It makes all the first letter of each word"""
    return ' '.join(i[0].upper() + i[1:] for i in obj.split())

async def load(file):
    """json.load in a asynchronous way"""
    return json.load(file)

async def read_json(file):
    """Get the data of json file"""
    json_data = ''
    with open(file, 'r', encoding='utf-8') as file_modifier:
        json_data = await load(file_modifier)
    return json_data

def make_house_list(tlist):
    return [k for k in tlist for g in ('city', 'district', 'street', 'house') if g == k]

async def organize_http_with_another_data(http_data, file):
    """Verify http or return all possible things with atual information"""
    data = await read_json(file)
    legible_http = json.loads(http_data)
    response_data = {}
    organize_args = dict(main=legible_http,
                         keys=make_house_list(list(legible_http.keys())),
                         cause_error=(True, True, False, False)
                        )
    response_data = await solve_recursive_objects(data, {}, **organize_args)
    if response_data == 'error':
        return 'error', '409 Conflict'
    return response_data

async def send_http_response(sender, the_header, data='', make_to_json=True):
    """Send an http response"""
    if make_to_json:
        data = json.dumps(data)
    nb_header = the_header.decode('utf-8')
    sender.write(the_header)
    if not verify_ok(nb_header[:15]):
        print('Dados de erro enviados')
        return
    sender.write(gzip.compress(data.encode('utf-8')))
    await sender.drain()
    sender.close()
    print('Dados enviados')

async def async_server(reader: asyncio.StreamReader, writer: asyncio.StreamWriter) -> None:
    """An asynchronous server to this program"""
    http_request = await reader.read(4096)
    print('Mensagem recebida')
    http_data = await receive_http_data(http_request)
    code = '200 OK'
    response_data = await organize_http_with_another_data(http_data, 'data/houses.json')
    if 'error' in response_data:
        response_data, code = response_data
    http_headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Encoding': 'gzip',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
        }
    header = make_http_header(http_headers, 'HTTP/1.1 ' + code)
    await send_http_response(writer, header, response_data)
    writer.close()

if __name__ == "__main__":
    LOOP = asyncio.get_event_loop()
    LOOP.create_server
    CORO = asyncio.start_server(async_server, *('127.0.0.1', 1060), family=socket.AF_INET)
    SERVER = LOOP.run_until_complete(CORO)
    try:
        LOOP.run_forever()
    finally:
        SERVER.close()
        LOOP.close()
