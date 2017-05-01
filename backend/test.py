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

def test8():
    # Test GET on courses endpoint
    url = "http://localhost:8080/api/courses"
    res = requests.get(url)
    code = res.status_code
    data = json.loads(res.text)
    num_items = len(data)
    assert (code == 200)
    print "Test 8 passed"
    return num_items

def test9():
    # Test POSTing to the courses endpoint
    url = "http://localhost:8080/api/courses"
    course = {"name": "Virtual Reality", "code": "CS498SL"}
    res = requests.post(url, course)
    code = res.status_code
    data = json.loads(res.text)
    temp_id = data['_id']
    assert (code == 200)
    print "Test 9 passed"
    return temp_id

def test10(num_courses):
    # Test that the POST created a new course
    url = "http://localhost:8080/api/courses"
    res = requests.get(url)
    code = res.status_code
    data = json.loads(res.text)
    num_items = len(data)
    assert (num_items > num_courses)
    assert (code == 200)
    print "Test 10 passed"

def test11(id):
    # Test GETing the courses/course_id endpoint
    url = "http://localhost:8080/api/courses/" + id
    res = requests.get(url)
    code = res.status_code
    assert (code == 200)
    print "Test 11 passed"

def test12(id):
    # Test DELETEing on the courses/course_id endpoint
    url = "http://localhost:8080/api/courses/" + id
    res = requests.delete(url)
    code = res.status_code
    assert (code == 200)
    print "Test 12 passed"

def test13(num_courses):
    # Test that the DELETE removed a course
    url = "http://localhost:8080/api/courses"
    res = requests.get(url)
    code = res.status_code
    data = json.loads(res.text)
    num_items = len(data)
    assert (num_items == num_courses)
    assert (code == 200)
    print "Test 13 passed"

def test14():
    # Test PUT on a Profile to modify its classes

    ## Create a new Profile
    url = "http://localhost:8080/api/profiles"
    profile = {"name": "Test User"}
    res = requests.post(url, profile)
    code = res.status_code
    data = json.loads(res.text)
    temp_id = data['_id']

    ## Get and Modify the new profile's classes array with 3 fake classes
    url = "http://localhost:8080/api/profiles/" + temp_id
    payload = {
        "classes" : [111, 222, 333]
    }
    res = requests.put(url, payload)
    code = res.status_code

    ## Check that our PUT request went through OK
    assert( code == 200 )

    ## Check that our updated profile's classes array is now length 3
    updated_data = json.loads(res.text)
    assert( len(updated_data["classes"]) == 3 )

    ## Delete the new user
    res = requests.delete(url)
    print "Test 14 passed"

def test15():
    # Test GETing a nonexistent enrollment id; should have 0 students enrolled
    url = "http://localhost:8080/api/enrollment/999999999"
    res = requests.get(url)
    code = res.status_code
    data = json.loads(res.text)
    num_items = len(data)
    assert (code == 200)
    assert (num_items == 0)
    print "Test 15 passed"

def test16():
    # Test POSTing to the courses endpoint
    url = "http://localhost:8080/api/courses"
    course = {"name": "Virtual Reality", "code": "CS498SL"}
    res = requests.post(url, course)
    code = res.status_code
    data = json.loads(res.text)
    temp_id = data['_id']
    assert (code == 200)
    print "Test 16 passed"
    return temp_id

def test17(id):
    # Test a GET on the enrollment of the id that we just created; should be 0
    url = "http://localhost:8080/api/enrollment/" + id
    res = requests.get(url)
    code = res.status_code
    data = json.loads(res.text)
    num_items = len(data)
    assert (code == 200)
    assert (num_items == 0)
    print "Test 17 passed"

def test18(id):
    # Create a profile
    url = "http://localhost:8080/api/profiles"
    profile = {"name": "Test User"}
    res = requests.post(url, profile)
    code = res.status_code
    data = json.loads(res.text)
    temp_id = data['_id']

    # Add the course we created to its course array
    url = url + "/" + temp_id
    res = requests.put(url, {"classes": [id]})
    code = res.status_code
    data = json.loads(res.text)

    # Test the enrollment on our course
    url = "http://localhost:8080/api/enrollment/" + id
    res = requests.get(url)
    code = res.status_code
    data = json.loads(res.text)
    num_items = len(data)
    assert (code == 200)
    assert (num_items == 1)
    print "Test 18 passed"

    # Delete the fake user and the fake course
    res = requests.delete("http://localhost:8080/api/profiles/" + temp_id)
    res = requests.delete("http://localhost:8080/api/courses/" + id)

def test19():
    # Create a fake course with the code in the 900's
    url = "http://localhost:8080/api/courses"
    course = {"name": "Dummy Class", "code": "CS999"}
    res = requests.post(url, course)
    code = res.status_code
    data = json.loads(res.text)
    temp_id = data['_id']

    # Test GETing all courses with a 900-level code; we expect 1
    url = "http://localhost:8080/api/courses?level=900"
    res = requests.get(url)
    code = res.status_code
    data = json.loads(res.text)
    num_items = len(data)
    assert (num_items == 1) # Expect only 1 course
    print "Test 19 passed"

    # Delete the fake course
    res = requests.delete("http://localhost:8080/api/courses/" + temp_id)

def main():
    # Week 1 Tests
    test1() # Test a basic GET on our api root endpoint to see if it's running
    num_profiles = test2() # Test a GET on our /profiles endpoint and return the number of profiles we have initially
    id = test3() # Test a POST on our /profiles endpoint and return the ID so we can delete it later
    test4(num_profiles) # Test a GET on our /profiles endpoint to see if the number of profiles went up
    test5(id) # Test a GET on our /profiles/:profile_id endpoint to see if we get the profile we created back
    test6(id) # Test a DELETE on our /profiles/:profile_id endpoint to delete the profile we made
    test7(num_profiles) # Test a GET on our /profiles endpoint to see if the number of profiles went back down

    # Week 2 Tests
    ## - Courses Endpoints
    num_courses = test8() # Test a GET on our /courses endpoint and return the number of courses we have initially
    course_id = test9() # Test a POST on our /courses endpoint and return the course ID so we can delete it later
    test10(num_courses) # Test a GET on our /courses endpoint to see if the number of courses went up
    test11(course_id) # Test a GET on our /courses/:course_id endpoint to see if we get the right course back
    test12(course_id) # Test a DELETE on our /courses/:course_id endpoint to delete the profile we made
    test13(num_courses) # Test a GET on our /courses endpoint to see if the number of courses went back down
    ## - Profile Endpoints
    test14() # Test using PUT request to update a user's Classes array

    # Week 3 Tests
    ## - Enrollment Endpoint
    test15() # Test GETing a nonexistent enrollment id; should have 0 students enrolled
    course_id = test16() # Test POSTing to the courses endpoint
    test17(course_id) # Test a GET on the enrollment of the id that we just created; should be 0
    test18(course_id) # Create a fake user and register it to our fake course; test that enrollment is now 1

    # Week 4 Tests
    ## - Course Endpoint Optional Params
    test19() # Large test; see specs on Test 19 for details

    print "Passed all tests"


main()
