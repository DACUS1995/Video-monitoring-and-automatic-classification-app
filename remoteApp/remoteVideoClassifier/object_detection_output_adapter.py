import json

# Logging and data selection
def log_results(outfile, results, categories):
  for index_score in range(len(results["scores"])):

    value_score = results["scores"][index_score]
    if value_score > 0.85:
      class_id = results['classes'][index_score]

      message = {}
      data = {}

      data["name"] = categories[class_id]['name']
      data["id"] = categories[class_id]['id']
      data["score"] = int(100 * value_score)

      message["subject"] = "classification_results"
      message["message"] = data

      json_message = json.dumps(message)
      print(json_message)

      # print(f"Found: [name: {categories[index_score]['name']}, id: {categories[index_score]['id']}] with score: [{value_score}]")

def log_results_test(outfile, results, categories):
  print(f'{json.dumps(results)}\n')
  
  ## Use this only if you want to log the results in a file
  # log_results.counter += 1
  # json.dump(results["classes"], outfile)

  # print(f"Frame: {log_results.counter}")
  # print(results["classes"])
# log_results.counter = 0

#   ---EXAMPLE----
# Template of mesage JSON
# {
#   subject: "subject",
#   message: "message"
# }