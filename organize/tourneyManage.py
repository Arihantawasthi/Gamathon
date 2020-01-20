import math

def split(x, n): 
	numbers = []
	# If we cannot split the 
	# number into exactly 'N' parts 
	if(x < n): 
		print(-1) 

	# If x % n == 0 then the minimum 
	# difference is 0 and all 
	# numbers are x / n 
	elif (x % n == 0): 
		for i in range(n): 
			numbers.append(x//n)
	else: 
		# upto n-(x % n) the values 
		# will be x / n 
		# after that the values 
		# will be x / n + 1 
		zp = n - (x % n) 
		pp = x//n 
		for i in range(n): 
			if(i>= zp): 
				numbers.append(pp+1)
				#print(pp + 1, end =" ") 
			else: 
				numbers.append(pp)
				#print(pp, end =" ") 
	return numbers		

# isPowerOfTwo:- To check if the total number of teams are in power of two
def isPowerOfTwo(total_participants):
    if total_participants % 2 != 0:
    	return False
    
    if total_participants == 0:
        return False

    while total_participants != 1:
        if total_participants % 2 != 0:
            return False

        total_participants = int(total_participants // 2)

    return True

#Calculating total number of rounds, returns dictionary containing no. of first rounds and no of total rounds.
def totalRounds(no_of_participants, no_of_participants_per_match):
    counter = 0
    params = {}
    if (isPowerOfTwo(no_of_participants)):
    	no_of_first_rounds = no_of_participants // 2
    	params['no_of_first_rounds'] = no_of_first_rounds
    	while (no_of_participants != 0):
    		no_of_participants = no_of_participants // 2
    		counter += 1
    		total_stages = no_of_participants // no_of_participants_per_match
    		params['total_stages'] = counter-1

    	return params

    elif (not isPowerOfTwo(no_of_participants)):
    	if no_of_participants % 2 == 0:
    		no_of_participants = 2**(math.floor(math.log(no_of_participants, 2) + 1))
    		no_of_first_rounds = no_of_participants // 2
    		while (no_of_participants != 0):
    			no_of_participants = no_of_participants // 2
    			counter += 1
    			total_stages = no_of_participants // no_of_participants_per_match
    		params['no_of_first_rounds'] = no_of_first_rounds
    		params['total_stages'] = counter - 1

    	elif no_of_participants % 2 != 0:
    		no_of_participants -= 1
    		no_of_participants = 2**(math.floor(math.log(no_of_participants, 2) + 1))
    		no_of_first_rounds = no_of_participants // 2
    		while (no_of_participants != 0):
    			no_of_participants = no_of_participants // 2
    			counter += 1
    			total_stages = no_of_participants // no_of_participants_per_match

    		params['no_of_first_rounds'] = no_of_first_rounds
    		params['total_stages'] = counter - 1
    		#print(params.get('no_of_first_rounds'))

    return params