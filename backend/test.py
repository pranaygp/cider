import requests
import json

def test1():
    # Test that the server is running appropriately
    url = "http://localhost:8080/api"
    res = requests.get(url)
    code = res.status_code
    assert (code == 200)
    print "Test 1 passed"

def test2():
    # Test GET on profiles endpoint
    url = "http://localhost:8080/api/profiles"
    res = requests.get(url)
    code = res.status_code
    data = json.loads(res.text)
    num_items = len(data)
    assert (code == 200)
    print "Test 2 passed"
    return num_items

def test3():
    # Test POSTing to the profiles endpoint
    url = "http://localhost:8080/api/profiles"
    profile = {"name": "Test User"}
    res = requests.post(url, profile)
    code = res.status_code
    data = json.loads(res.text)
    temp_id = data['_id']
    assert (code == 200)
    print "Test 3 passed"
    return temp_id

def test4(num_profiles):
    # Test that the POST created a new profile
    url = "http://localhost:8080/api/profiles"
    res = requests.get(url)
    code = res.status_code
    data = json.loads(res.text)
    num_items = len(data)
    assert (num_items > num_profiles)
    assert (code == 200)
    print "Test 4 passed"

def test5(id):
    # Test GETing the profile/profile_id endpoint
    url = "http://localhost:8080/api/profiles/" + id
    res = requests.get(url)
    code = res.status_code
    assert (code == 200)
    print "Test 5 passed"

def test6(id):
    # Test DELETEing on the profile/profile_id endpoint
    url = "http://localhost:8080/api/profiles/" + id
    res = requests.delete(url)
    code = res.status_code
    assert (code == 200)
    print "Test 6 passed"

def test7(num_profiles):
    # Test that the DELETE removed a profile
    url = "http://localhost:8080/api/profiles"
    res = requests.get(url)
    code = res.status_code
    data = json.loads(res.text)
    num_items = len(data)
    assert (num_items == num_profiles)
    assert (code == 200)
    print "Test 7 passed"

def main():
    test1() # Test a basic GET on our api root endpoint to see if it's running
    num_profiles = test2() # Test a GET on our /profiles endpoint and return the number of profiles we have initially
    id = test3() # Test a POST on our /profiles endpoint and return the ID so we can delete it later
    test4(num_profiles) # Test a GET on our /profiles endpoint to see if the number of profiles went up
    test5(id) # Test a GET on our /profiles/:profile_id endpoint to see if we get the profile we created back
    test6(id) # Test a DELETE on our /profiles/:profile_id endpoint to delete the profile we made
    test7(num_profiles) # Test a GET on our /profiles endpoint to see if the number of profiles went back down

    print "Passed all tests"


main()
