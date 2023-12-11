def dictfetchall(cursor):
    "Returns all rows from a cursor as a dict"
    if cursor.rowcount == 0:
        return []
    
    desc = cursor.description
    return [
        dict(zip([col[0] for col in desc], row))
        for row in cursor.fetchall()
    ]
