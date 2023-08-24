x = [
    [-1, 2, -13, 3, 3],
    [4, 3, -9, 1, 1],
    [3, -1, 8, -2, -2],
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
    if i >= size[1] or i >= size[0]: continue
    c = x[i][i]
    if c == 0: continue
    for k in range(size[1]):
        x[i][k] = x[i][k] / c

    # make below element zero
    for r in range(i+1, size[0]):
        c = x[r][i] / x[i][i]
        for k in range(i, size[1]):
            x[r][k] = x[r][k] - x[i][k]*c
    
    print_mat(x)

for i in range(size[1]-1):
    if i >= size[1] or i >= size[0]: continue
    # make alove element zero
    for r in range(0, i):
        c = x[r][i] / x[i][i]
        for k in range(i, size[1]):
            x[r][k] = x[r][k] - x[i][k]*c

    print_mat(x)