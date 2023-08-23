x = [
    [5,2,3,4],
    [4,5,6,7],
    [3,5,7,2],
    [3,5,3,5],
    [2,1,6,4],
    [3,6,6,4],
]

size = len(x), len(x[0])

def print_mat(x):
    print("======================================")
    for row in x:
        for e in row:
            print(round(e,2),end='\t')
        print()
    print("======================================")


for i in range(size[1]-1):
    c = x[i][i]
    if c == 0: continue
    for k in range(size[1]):
        x[i][k] = x[i][k] / c

    # make below element zero
    for r in range(i+1, size[0]):
        c = x[r][i] / x[i][i]
        for k in range(i, size[1]):
            x[r][k] = x[r][k] - x[i][k]*c
    
    # make alove element zero
    for r in range(0, i):
        c = x[r][i] / x[i][i]
        for k in range(i, size[1]):
            x[r][k] = x[r][k] - x[i][k]*c

    print_mat(x)