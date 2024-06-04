import os
import re
import subprocess
from concurrent.futures import ThreadPoolExecutor

exclude_file = '.ci/.exclude_files'
root_dir = os.path.curdir

with open(exclude_file, 'r') as f:
    exclude_patterns = [re.compile(line.strip()) for line in f.readlines()]

def find_py_files(root_dir, exclude_patterns):
    py_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            file_path = os.path.join(root, file)
            relative_path = os.path.relpath(file_path, root_dir)
            if file.endswith('.py') and ".preview." not in file:
                ignore_file = any(pattern.search(relative_path) for pattern in exclude_patterns)
                if not ignore_file:
                    py_files.append(relative_path)
    return py_files

def execute_file(file_path):
    result = subprocess.run(['python', file_path], capture_output=True, text=True)
    return result.stdout, result.stderr, file_path

def main():
    files_to_execute = find_py_files(root_dir, exclude_patterns)
    print("Executing these python files:")
    print("\n".join(files_to_execute))

    with ThreadPoolExecutor() as executor:
        futures = [executor.submit(execute_file, file) for file in files_to_execute]
        for future in futures:
            stdout, stderr, file_path = future.result()
            print(f'\nExecuting {file_path}:\n\n Output: \n\r {stdout}')
            if stderr:
                print(f'\nError from {file_path}:\n\n Error: {stderr}')


if __name__ == "__main__":
    main()
