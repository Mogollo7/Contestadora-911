import heapq
# codigo de brand
class FIFOQueue:

    def __init__(self):
        self.queue = []
        self.index = 0

    def enqueue(self, item, priority):
        heapq.heappush(self.queue, (priority, self.index, item))
        self.index += 1

    def dequeue(self):
        if not self.is_empty():
            _, _, item = heapq.heappop(self.queue)
            return item
        return None

    def is_empty(self):
        return len(self.queue) == 0
#lifo
class CallHistoryStack:
    def __init__(self):
        self.stack = []

    def push(self, call):
        self.stack.append(call)

    def pop(self):
        if not self.is_empty():
            return self.stack.pop()
        return None

    def is_empty(self):
        return len(self.stack) == 0

    def get_history(self):
        return list(reversed(self.stack))  # Para visualizar en orden cronológico
